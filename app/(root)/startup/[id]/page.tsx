import { client } from "@/sanity/lib/client"
import { STARTUP_BY_ID_QUERY, PLAYLIST_BY_SLUG_QUERY, AUTHOR_BY_EMAIL_QUERY } from "@/sanity/lib/queries"
import { notFound } from "next/navigation"
import { formatDate } from '@/lib/utils';
import Link from "next/link";
import Image from "next/image";
import markdownit from 'markdown-it'
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Views from "@/components/Views";
import StartUpCard from "@/components/StartUpCard";
import { StartUpCardType } from "@/components/StartUpCard";

export const experimental_ppr = true

const md = markdownit()

const page = async ({ params }: { params: Promise<{id: string}> }) => {

    const id = (await params)?.id

    const [post, { select: editorPicks }] = await Promise.all([
        client.fetch(STARTUP_BY_ID_QUERY, {id}),
        client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: 'editor-picks'})
    ]) // parallel requests

    const { _id: authorID }  = await client.fetch(AUTHOR_BY_EMAIL_QUERY, { email : post?.author?.email })

    if(!post) return notFound()
    const parsedContent = md.render(post?.pitch || '')

    console.log("Post: ", post.author.image)

    return (
        <>
             <section className="pink_container !min-h-[230px]">
                <p className="tag">{formatDate(post?._createdAt)}</p>
                <h1 className="heading">{post.title}</h1>
                <p className="sub-heading !max-w-5xl">{post.description}</p>
            </section>

            <section className="section_container">
                <Image
                    src={post.image}
                    alt="thumbnail"
                    className="w-full h-auto rounded-xl"
                    width={1000}
                    height={800}
                />

                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link
                            href={`/user/${authorID}`}
                            className="flex gap-2 items-center mb-3"
                        >
                            <Image
                                src={post.author.image}
                                alt="avatar"
                                width={64}
                                height={64}
                                className="rounded-full drop-shadow-lg"
                            />

                            <div>
                                <p className="text-20-medium">{post.author.name}</p>
                                <p className="text-16-medium !text-black-300">@{post.author.username}</p>
                            </div>
                        </Link>
                        <Link href={`/?query=${post.category}`}>
                            <p className="category-tag">{post.category}</p>
                        </Link>
                    </div>

                    <h3 className="text-30-bold">Pitch Details</h3>
                    {parsedContent ? (
                        <article
                            className="prose max-w-4xl font-work-sans break-all"
                            dangerouslySetInnerHTML={{ __html: parsedContent }}
                        />
                    ) : (
                        <p className="no-result">No Details Provided :(</p>
                    )}

                </div>

                <hr className="divider"/>

                {editorPicks?.length > 0 && (
                    <div className="max-w-4xl mx-auto">
                        <p className="text-30-semibold">Editor Picks</p>
                        <ul className="mt-7 card_grid-sm">
                            {editorPicks.map((post: StartUpCardType, i: number) => {
                                if(post._id != id) return <StartUpCard key={i} post={post} />
                            })}
                        </ul>
                    </div>
                )}

                <Suspense fallback={<Skeleton className="view_skeleton"/>}>
                    <Views id={id}/>
                </Suspense>
            </section>

        </>
    )
}

export default page