import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'

export const config={

    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2021-10-21",
    token:process.env.SANITY_API_TOKEN,

    // use to make use of cdn if app is using production database
    useCdn: process.env.NODE_ENV==="production",
}

const client = sanityClient(config);

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) 
{
    const { _id,name,email,comment }= JSON.parse(req.body);

    try{
        await client.create({
            _type: 'comment',
            post:{
                _type: 'reference',
                _ref: _id,
            },
            name,
            email,
            comment,
        });
    } catch(err){
        console.log("Could't send data");
        return res.status(500).json({message: `Counld't able to send Message`})
    };
    console.log("Comment Successfull");
    return res.status(200).json({ message:"Comment Submitted"});
}
