import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIWES_BY_ID_QUERY } from "@/sanity/lib/queries";
import { formatViews } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from "next/server";

const Views = async ({ id }: {id: string}) => {

    const { views: totalViews } = await client.withConfig({useCdn: false}).fetch(STARTUP_VIWES_BY_ID_QUERY, {id})
    after(async () => {
        await writeClient.patch(id).set({ views: totalViews + 1 }).commit()
    })

    return (
        <div className="view-container">
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>

            <p className="view-text">
            <span className="font-black">{formatViews(totalViews + 1)}</span>
            </p>
        </div>
        );
}

export default Views