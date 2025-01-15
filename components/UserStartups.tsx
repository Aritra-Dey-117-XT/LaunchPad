import React from 'react'
import { client } from '@/sanity/lib/client'
import { STARTUP_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import StartUpCard, { StartUpCardType } from './StartUpCard'
import { auth } from '@/auth'
import { AUTHOR_BY_EMAIL_QUERY } from '@/sanity/lib/queries'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'

const UserStartups = async ({ id }: { id: string }) => {

    // const startups = await client.fetch(STARTUP_BY_AUTHOR_QUERY, {uid: id})
    const { data: startups } = await sanityFetch({query: STARTUP_BY_AUTHOR_QUERY, params: {uid: id}})
    const session = await auth()
    const {_id: userId} = await client.fetch(AUTHOR_BY_EMAIL_QUERY, {email: session?.user?.email})

    return (
        <>
            {startups.length > 0 ? (
                startups.map((startup: StartUpCardType) => {
                    return (
                        <div key={startup._id}>
                            <StartUpCard post={startup} isUserProfile={userId == id} />
                        </div>
                    )     
                })     
                ) : (
                    <div className="no-result">
                        No Startups Posted Yet :/
                    </ div>
                )}
            <SanityLive />
        </>
    )
}

export default UserStartups