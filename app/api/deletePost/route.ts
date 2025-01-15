import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";


export async function DELETE(request: NextRequest) {

    const reqBody = await request.json()
    const postID = reqBody.postId

    try {

        await writeClient.delete(postID)
        return NextResponse.json({message: "Startup Deleted Successfully!"}, {status: 200})

    } catch (error: any) {

        return NextResponse.json({message: error.description}, {status: 500})
    }
    
}