"use client"

import { EyeIcon } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Startup, Author } from '@/sanity.types';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';
import { Pencil, Trash2 } from 'lucide-react';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export type StartUpCardType = Omit<Startup, 'author'> & { 'author': Author }

interface StartUpCardProps {
    post: StartUpCardType,
    isUserProfile?: boolean
}

interface DeletePost {
    postId: string
}

const StartUpCard = ({ post, isUserProfile = false } : StartUpCardProps ) => {

    const {_createdAt, views, author: {_id: UID, id: githubID, name, image: userImage}, _id, description, image, category, title} = post
    const router = useRouter()

    const handleEdit = (post: StartUpCardType) => {
        router.push(`/startup/edit/${post._id}`)
    }

    const handleDelete = async (post: StartUpCardType) => {
        const result = await Swal.fire({
            title: "Are you sure to DELETE the Startup?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, DELETE it!"
          })

        if (result.isConfirmed) {
            try {
                const response = await axios.delete("/api/deletePost", {data: { postId: post._id} as DeletePost })
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Startup has been Deleted Successfully!",
                    icon: "success"
                });
            } catch (error) {
                console.log(error)
                Swal.fire({
                    title: "Error!",
                    text: "Some Error occured while deleting, unable to delete!",
                    icon: "error"
                });
            }
            Swal.fire({
            title: "Deleted!",
            text: "Your Startup has been Deleted Successfully!",
            icon: "success"
            });
        }};

    return (

        <li className="startup-card group">
            <div className="flex-between">
                <p className="startup_card_date">{formatDate(_createdAt)}</p>
                <div className="flex gap-1.5">
                    <EyeIcon className="size-6 text-primary" />
                    <span className="text-16-medium">{views}</span>
                </div>
            </div>

            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${UID}`}>
                        <p className="text-16-medium line-clamp-1">{name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className="text-26-semibold line-clamp-1">{title}</h3>
                    </Link>
                </div>
                <Link href={`/user/${UID}`}>
                    <Image
                        src={userImage!}
                        alt={name!}
                        width={48}
                        height={48}
                        className="rounded-full"
                    />
                </Link>
            </div>

            <Link href={`/startup/${_id}`}>
                <p className="startup-card_desc">{description}</p>
                <img src={image} alt="placeholder" className="startup-card_img" />
            </Link>

            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className="text-16-medium">{category}</p>
                </Link>
                <Button className="startup-card_btn" asChild>
                    <Link href={`/startup/${_id}`}>Details</Link>
                </Button>
                
                    { isUserProfile && (
                        <div className="flex gap-2">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-9 w-9 hover:bg-primary-light"
                                onClick={() => handleEdit(post)}
                            >
                                <Pencil className="size-5 text-primary" />
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-9 w-9 hover:bg-destructive-light"
                                onClick={async () => await handleDelete(post)}
                            >
                                <Trash2 className="size-5 text-destructive" />
                            </Button>
                        </div>
                    )}
            </div>
        </li>
    )}

export const StartupCardSkeleton = () => (
    <>
      {[0, 1, 2, 3, 4].map((index: number) => (
        <li key={cn("skeleton", index)}>
          <Skeleton className="startup-card_skeleton" />
        </li>
      ))}
    </>
    );

export default StartUpCard