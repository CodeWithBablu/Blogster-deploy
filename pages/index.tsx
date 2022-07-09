import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

//import Component
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { post } from "../typings";

export async function getServerSideProps() {
  const query = `
  *[_type=='post']{
  
    _id,
    title,
    slug,
    description,
    mainImage,
    author->{
    name,
    image
  }
  }
  `;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
}

interface props {
  posts: [post];
}

export default function Home({ posts }: props) {
  
  return (
      <div className="max-w-7xl m-auto">
        <Head>
          <title>Blogster</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Header />
        <div
          className="flex justify-between items-center bg-indigo-600 
        border-y border-black py-10 lg:py-0"
        >
          <div className="space-y-5 px-10">
            <h1 className="text-6xl text-white max-w-xl font-serif">
              <span className="underline decoration-rose-500">Blogster</span> is
              a place to write, read and connect
            </h1>
            <h2 className="text-gray-300">
              It's free and easy to post your ideas on topic of your interest
              with thousands of readers. Let the community grow as you grow. No
              need getting started is easy
            </h2>
          </div>

          <img
            className="hidden md:inline-flex h-44 lg:h-80"
            src="./images/icon.svg"
            alt=""
          />
        </div>
        {/* {posts} */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 "> 
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              {
                <div className="bg-gray-400  group border-black rounded-sm cursor-pointer overflow-hidden">
                  {
                  post.mainImage && (
                    <img className="h-60  w-full object-cover group-hover:scale-105
                      transition-transform duration-200 ease-in-out" src={urlFor(post.mainImage).url()} alt="" />
                  )
                  } 
                  <div className="bg-gray-400 flex justify-between p-5">
                    <div>
                      <p className="text-lg text-black font-bold">{post.title}</p>
                      <p className="text-xs ">{post.description} by {post.author.name}</p>
                    </div>

                    <img className="h-12 w-12 rounded-full" src={ urlFor(post.author.image).url()! } alt="" />
                  </div>
                </div>
                }
            </Link>
          ))}
        </div>
      </div>
  );
}
