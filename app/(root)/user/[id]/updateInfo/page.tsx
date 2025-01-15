import { UserDetailsForm } from '@/components/UserDetailsForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { client } from "@/sanity/lib/client"
import { AUTHOR_BY_USERID_QUERY } from "@/sanity/lib/queries"

const page = async ({ params }: {params: Promise<{id: string}>}) => {

    const id = (await params)?.id
    const user = await client.fetch(AUTHOR_BY_USERID_QUERY, { uid: id })
    user._id = id

    const session = await auth()
    if(!session) redirect('/')

    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <h1 className="heading">
                    edit your info
                </h1>

                <p className="sub-heading !max-w-3xl">
                    GIVE THE PEOPLE AROUND THE GLOBE A CHANCE TO KNOW YOU BETTER :)
                </p>

            </section>

            <section>
                <UserDetailsForm user={user}/>
            </section>
        </>
    )
}

export default page