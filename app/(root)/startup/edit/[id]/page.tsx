import StartupEditForm from '@/components/StartupEditForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { client } from "@/sanity/lib/client"
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries"

const page = async ({ params }: {params: Promise<{id: string}>}) => {

    const id = (await params)?.id
    const post = await client.fetch(STARTUP_BY_ID_QUERY, { id })

    const session = await auth()
    if(!session) redirect('/')

    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <h1 className="heading">
                    edit your startup
                </h1>

                <p className="sub-heading !max-w-3xl">
                    DON'T JUST EDIT YOUR IDEA, MAKE IT BETTER :)
                </p>

            </section>

            <section>
                <StartupEditForm post={post} />
            </section>
        </>
    )
}

export default page