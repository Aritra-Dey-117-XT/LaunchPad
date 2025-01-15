import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";
import { AUTHOR_BY_EMAIL_QUERY } from "@/sanity/lib/queries";

export async function PATCH(request: NextRequest) {

    const { data: { email, formData: {displayName, profileImage, bio, instagramURL, linkedInURL, facebookURL, X_URL, githubURL }} } = await request.json()
    const { _id: id } = await writeClient.fetch(AUTHOR_BY_EMAIL_QUERY, {email: email})
    
    try {

        await writeClient.patch(id).set({
            name: displayName,
            image: profileImage,
            bio: bio,
            instagramURL: instagramURL,
            linkedInURL: linkedInURL,                
            facebookURL: facebookURL,
            X_URL: X_URL,
            githubURL: githubURL,
        }).commit()

        return NextResponse.json({message: "Your Details has been updated Successfully!"}, {status: 200})

    } catch (error: any) {
        return NextResponse.json({error: error.description}, {status: 500})
    }
}