import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";

export async function PATCH(request: NextRequest) {
    
    const reqBody = await request.json()
    const {data: {id, formData}} = reqBody

    try {

        await writeClient.patch(id).set({
            title: formData.title,
            description: formData.description,
            category: formData.category,
            image: formData.link,
            pitch: formData.pitch
        }).commit()

        return NextResponse.json({message: "Startup Upodated Successfully!"}, {status: 200})

    } catch (error: any) {
        return NextResponse.json({error: error.description}, {status: 500})
    }

}