import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut } from '@/auth'
import { Avatar } from "@/components/ui/avatar";
import { BadgePlus, LogOut } from "lucide-react";
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_EMAIL_QUERY, AUTHOR_BY_USERID_QUERY } from '@/sanity/lib/queries';

interface UserDetails {
    id: string,
    name: string,
    username: string,
    email: string,
    image: string,
    bio: string
}

const Navbar = async () => {

    const session = await auth()

    let userSessionID = null
    let userDetails: UserDetails = {
        id: "",
        name: "",
        username: "",
        email: "",
        image: "",
        bio: ""
    }
    if(session) {
        userSessionID = await client.fetch(AUTHOR_BY_EMAIL_QUERY, {email: session?.user?.email})
        userDetails = await client.fetch(AUTHOR_BY_USERID_QUERY, {uid: userSessionID?._id})
    }

    return (
    <header className='px-5 py-1 bg-white shadow-sm font-work-sans'>
        <nav className='flex justify-between items-center'>
            <Link href="/">
                <Image src="/logo.png" alt="logo" height={30} width={170}/>
            </Link>

            <div className='flex items-center gap-5 text-black'>
                { session && session?.user ? (
                    <>
                        <Link href="/startup/create">
                            <span className="max-sm:hidden">Create</span>
                            <BadgePlus className="size-6 sm:hidden" />
                        </Link>

                        <form action={async () => {
                            "use server"
                            await signOut({redirectTo: "/"})
                        }}>
                            <button type='submit'>
                                <span className="max-sm:hidden">Logout</span>
                                <LogOut className="w-[23px] h-[23px] sm:hidden text-red-500 mt-1.5" />
                            </button>
                        </form>

                        <Link href={`/user/${userSessionID?._id}`}>
                            <Avatar className="size-10">
                                <Image
                                    src={userDetails?.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/510px-Default_pfp.svg.png'}
                                    alt={userDetails?.name || 'User'}
                                    width={500}
                                    height={500}
                                    className="rounded-full"
                                />
                            </Avatar>

                        </Link>

                    </>
                ):(
                    <Link href="/signin">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    </header>
    )
}

export default Navbar