import{
    createCurrentUserHook,
    createClient,
} from "next-sanity"

import createImageUrlBuilder from "@sanity/image-url"

export const config={

    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: "2021-10-21",

    // use to make use of cdn if app is using production database
    useCdn: process.env.NODE_ENV==="production",
}
//set up the client for fetching data in getProps page function
export const sanityClient= createClient(config);

// To make image url with the asset.
// It references data in my database.
export const urlFor = (source)=> createImageUrlBuilder(config).image(source);

// Helper function for using the current logged in user account
export const useCurrentUser= createCurrentUserHook(config);