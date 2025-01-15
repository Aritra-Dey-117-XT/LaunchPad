import StartupForm from "@/components/StartupForm"
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const page = async () => {

    const session = await auth()
    if(!session) redirect('/')

    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <h1 className="heading">
                    submit your startup
                </h1>

                <p className="sub-heading !max-w-3xl">
                    SHARE YOUR IDEA WITH THE WORLD
                </p>

            </section>

            <section>
                <StartupForm />
            </section>
        </>
    )
}

export default page