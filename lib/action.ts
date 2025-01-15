"use server"

import { parseServerActionResponse } from "./utils"
import { auth } from "@/auth"
import { writeClient } from "@/sanity/lib/write-client"
import slugify from 'slugify'
import { client } from "@/sanity/lib/client"
import { AUTHOR_BY_EMAIL_QUERY } from "@/sanity/lib/queries"

interface FormValues {
    title: string,
    description: string,
    category: string,
    link: string,
    pitch: string,
}

export async function createPitch(state: any, formValues: FormValues) {

    const session = await auth()

    if(!session) return parseServerActionResponse({ 
        error: "Not Signed In!", 
        status: "ERROR"
    })

    const { _id: id } = await client.fetch(AUTHOR_BY_EMAIL_QUERY, {email: session?.user?.email})

    const { title, description, category, link, pitch } = formValues

    const slug = slugify(title as string, { lower: true, strict: true });

    try {

        const startup = {
            title,
            description,
            category,
            image: link,
            pitch,
            slug: {
                _type: slug,
                current: slug
            },
            author: {
                _type: 'reference',
                _ref: `${id}`
            },
            views: 0
        }

        const result = await writeClient.create({_type: "startup", ...startup})

        return parseServerActionResponse({
            ...result,
            error: '', 
            status: "SUCCESS"
        })
        
    } catch (error) {
        
        return parseServerActionResponse({ 
            error: JSON.stringify(error), 
            status: "ERROR"
        })
    }
}