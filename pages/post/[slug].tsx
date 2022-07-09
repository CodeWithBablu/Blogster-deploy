import PortableText from "react-portable-text";
import Header from "../../components/Header";
import { sanityClient,urlFor } from "../../sanity";
import { post } from "../../typings";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

interface props{
    post: post;
}

interface Params{
    params: {
        slug: string;
    }
}

interface IFormInput{
    _id:string;
    name: string;
    email: string;
    comment: string;
}

export async function getStaticPaths(){

    const query=`
    *[_type=='post']{
      _id,
      slug{
        current
      },
    }`;

    const posts= await sanityClient.fetch(query);

    const paths= posts.map( (post: post) =>({
        params:{
            slug: post.slug.current,
        }
    }));

    return {
        paths,
        fallback:'blocking',
    }

}

export async function getStaticProps({params}:Params){

    const query = `
    *[_type=='post' && slug.current== $slug][0]{
    
      _id,
      _createdAt,
      title,
      author->{
        name,
        image
      },
      'comments': *[
        _type=="comment" &&
        post._ref==^._id &&
        approved == true
      ],
      slug,
      description,
      mainImage,
      body
    }`;

    const post= await sanityClient.fetch(query,{
        slug: params?.slug,
    });

    if(!post)
        return {
            notFound: true,
        }

    return {
        props:{
            post,
        },
        revalidate:60,
    };
}

export default function Post( {post} : props ){
    
    const [ submitted, setSubmitted ]= useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

     const onSubmit: SubmitHandler<IFormInput> = async (data)=>{

        
        fetch('/api/createComment',{
            method: "POST",
            body: JSON.stringify(data),
        })
        .then(()=> {
            setSubmitted(true);
            console.log(data);
        })
        .catch((err)=> {
            setSubmitted(false);
            console.log(err);
        });

    };


    return (
        <main>
            <Header/>
            <img className="w-full h-40 object-cover" src={urlFor(post.mainImage).url()!} alt="" />

            <article className="max-w-3xl mx-auto p-5">
                <h1 className="text-sky-500 font-extrabold text-3xl mt-10 mb-3" >{post.title}</h1>
                <h2 className="text-xl font-light text-gray-300 mb-2">{post.description}</h2>
                <div className="flex items-center space-x-2">
                    <img className="h-10 w-10 rounded-full" 
                    src={urlFor(post.author.image).url()!} alt="" />
                    <p className="font-light text-gray-300 text-sm">Blog Post by{" "}
                        <span className="text-rose-400">{post.author.name}</span> -
                        Published at{" "}
                        {new Date(post._createdAt).toLocaleString()}
                    </p>
                </div>
                <div className="mt-10">
                    <PortableText
                        className=""
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                        content={post.body}
                        serializers={
                            {
                                h1: (props:any)=>(
                                    <h1 className="text-2xl text-rose-400 font-bold my-5" {...props}/>
                                ),
                                h2: (props:any)=>(
                                    <h2 className="text-xl text-sky-400 font-bold my-5" {...props}/>
                                ),
                                normal: (props:any)=>(
                                    <p className="text-gray-400 font-bold my-5" {...props}/>
                                ),
                                li: ({children}:any)=>(
                                    <li className="text-white ml-4 list-disc" >{children}</li>
                                ),
                                link: ({ href, children }:any)=>(
                                    <a href={href} className="text-green-300 hover:underline">{children}</a>
                                ),
                            }
                        }
                    />
                </div>
            </article>

            <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />


            { submitted?
            (
                <div className="text-black flex flex-col p-10 my-10 bg-sky-400
                    max-w-2xl mx-auto shadow-xl shadow-yellow-500">
                    <h1 className="text-3xl font-bold ">Thanks For Submitting your comment!!</h1>
                    <span>Once it has approved it, will appear below</span>
                </div>
                
            ):(
                <form onSubmit={ handleSubmit(onSubmit) } className="flex flex-col p-5 max-w-2xl mx-auto mb-10">
                <h3 className="text-sm font-mono text-yellow-300">Enjoyed this article?</h3>
                <h4 className="text-rose-400 text-3xl font-bold">Leave a comment!!</h4>
                <hr className="py-3 mt-2 border-cyan-300" />

                <input
                    {...register("_id")} 
                    type="hidden"
                    name="_id"
                    value={post._id} />

                <label className="block mb-5">
                    <span className="text-gray-300">Name</span>
                    <input
                        {...register("name",{required:true})}
                        className="shadow-border rounded py-2 px-3 form-input mt-1 block
                        w-full outline-none focus:ring ring-rose-500" placeholder="Name" type="text" />
                </label>
                <label className="block mb-5">
                    <span className="text-gray-300">Email</span>
                    <input
                        {...register("email",{required:true})}
                        className="shadow border rounded py-2 px-3 form-input mt-1 block
                        w-full outline-none focus:ring ring-rose-500" placeholder="Email @gmail.com @outlook @yahoo" type="email" />
                </label>
                <label className="block mb-5">
                    <span className="text-gray-300">Comment</span>
                    <textarea 
                        {...register("comment",{required:true})}
                        className="shadow mt-5 border rounded py-2 px-3 block w-full
                        outline-none focus:ring ring-rose-500" placeholder="Please follow group guidlines!!" rows={8} />
                </label>
                {/* {Error show here} */}
                <div className="flex flex-col p-5">
                    {errors.name && (
                        <span className="text-rose-400">!! Name field required</span>
                    )}
                    {errors.email && (
                        <span className="text-rose-400">!! Email field required</span>
                    )}
                    {errors.name && (
                        <span className="text-rose-400">!! Comment field required</span>
                    )}
                </div>

                <input className="text-black shadow bg-rose-500 hover:bg-rose-400 
                    focus:shadow-outline focus:outline-none font-bold py-2 px-4" type="submit"/>

            </form>
            )}

            {/* Comments */}

            <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto 
                shadow-lg shadow-indigo-500 space-y-2">
                <h3 className="text-4xl text-yellow-400 font-bold">Comments</h3>
                <hr className="pb-2"/>

                {
                    post.comments.map((comment)=>(
                        <div className="" key={post._id}>
                            <p className="text-gray-300">
                                <span className="text-rose-300">{comment.name}</span>
                                <br />
                                <span className="ml-4"> {"//"} {comment.comment }</span>    
                            </p>
                        </div>
                    ))
                }
            </div>

            
        </main>
    );
}