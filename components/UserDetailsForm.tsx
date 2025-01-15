"use client"

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader } from "lucide-react";
import { userSchema } from "@/lib/validation";
import { z } from "zod"
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";

export const UserDetailsForm = ({ user }: { user : any}) => {

    const [errors, setErrors] = useState<Record<string, string>>({});
    const { toast } = useToast()
    const router = useRouter()
    const [isPending, setPending] = useState(false);
    const [formData, setFormData] = useState({
        displayName: user.name,
        profileImage: user.image,
        bio: user.bio,
        linkedInURL: user.linkedInURL,
        instagramURL: user.instagramURL,
        facebookURL: user.facebookURL,
        X_URL: user.X_URL,
        githubURL: user.githubURL
    })
  
    const handleUpdate = async (formData: Object) => {

            try {
                await userSchema.parseAsync(formData)

                Swal.fire({
                    title: "Are you sure to UPDATE your Details?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, UPDATE my Details!"
                }).then(async (swalResult) => {
                    if(swalResult.isConfirmed) {

                        setPending(true)
                        const result = await axios.patch("/api/updateUserDetails", {data: {email: user.email, formData: formData}})

                        if(result.status == 200) {

                            Swal.fire({
                                title: "SUCCESS!",
                                text: "Your Details has been Updated Successfully!",
                                icon: "success"
                            })

                            router.push(`/user/${user._id}`)
                        }}
                    })

            } catch (error) {

                setPending(false)
                if(error instanceof z.ZodError) {
                    toast({
                        title: "Error",
                        description: "Please Check Your Input Fields and Try Again.",
                        variant: "destructive"
                    })

                    const fieldErrors = error.flatten().fieldErrors
                    setErrors(fieldErrors as unknown as Record<string, string>)
                    return
                }

                toast({
                    title: "Error",
                    description: "An Unexpected Error has occured!",
                    variant: "destructive"
                })
            }
        }

    return (
        <>
            <form className="startup-form">
                <div>
                    <label htmlFor="displayName" className="startup-form_label">Display Name<sup className="text-red-500">*</sup></label>
                    <Input
                        id="displayName"
                        name="displayName"
                        className="startup-form_input"
                        required
                        placeholder="Enter New Display Name"
                        value={formData.displayName}
                        onChange={(event) => setFormData({...formData, displayName: event.target.value})}
                    />

                    {errors.displayName && <p className="startup-form_error">{errors.displayName}</p>}
                </div>

                <div>
                    <label htmlFor="profile_image" className="startup-form_label">Profile Image URL<sup className="text-red-500">*</sup></label>
                    <Input
                        id="profile_image"
                        name="profile_image"
                        className="startup-form_textarea"
                        required
                        placeholder="Enter Link to Your Profile Image"
                        value={formData.profileImage}
                        onChange={(event) => setFormData({...formData, profileImage: event.target.value})}
                    />

                    {errors.profileImage && (<p className="startup-form_error">{errors.profileImage}</p>)}
                </div>

                <div>
                    <label htmlFor="bio" className="startup-form_label">Bio<sup className="text-red-500">*</sup></label>
                    <Textarea
                        id="bio"
                        name="bio"
                        className="startup-form_input"
                        required
                        placeholder="Enter Your Bio"
                        value={formData.bio}
                        onChange={(event) => setFormData({...formData, bio: event.target.value})}
                    />

                    {errors.bio && (<p className="startup-form_error">{errors.bio}</p>)}
                </div>

                {/* Instagram */}
                <div>
                    <label htmlFor="instagramURL" className="startup-form_label">Instagram URL</label>
                        <div className="relative">
                            <Input
                                id="instagramURL"
                                name="instagramURL"
                                className="startup-form_textarea pr-10"
                                placeholder="Enter Link to Your Instagram Profile"
                                value={formData.instagramURL || ""}
                                onChange={(event) => setFormData({...formData, instagramURL: event.target.value})}
                            />
                            {formData.instagramURL && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-red-100 hover:bg-red-200"
                                    onClick={() => setFormData({...formData, instagramURL: ""})}
                                >
                                    <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
                                </Button>
                            )}
                        </div>
                    {errors.instagramURL && (<p className="startup-form_error">{errors.instagramURL}</p>)}
                </div>

                {/* Facebook */}
                <div>
                    <label htmlFor="facebookURL" className="startup-form_label">Facebook URL</label>
                        <div className="relative">
                            <Input
                                id="facebookURL"
                                name="facebookURL"
                                className="startup-form_textarea pr-10"
                                placeholder="Enter Link to Your Facebook Profile"
                                value={formData.facebookURL || ""}
                                onChange={(event) => setFormData({...formData, facebookURL: event.target.value})}
                            />
                            {formData.facebookURL && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-red-100 hover:bg-red-200"
                                    onClick={() => setFormData({...formData, facebookURL: ""})}
                                >
                                    <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
                                </Button>
                            )}
                        </div>
                    {errors.facebookURL && (<p className="startup-form_error">{errors.facebookURL}</p>)}
                </div>

                {/* X.com */}
                <div>
                    <label htmlFor="X_URL" className="startup-form_label">X.com(Twitter) URL</label>
                        <div className="relative">
                            <Input
                                id="X_URL"
                                name="X_URL"
                                className="startup-form_textarea pr-10"
                                placeholder="Enter Link to Your X.com(former Twitter) Profile"
                                value={formData.X_URL || ""}
                                onChange={(event) => setFormData({...formData, X_URL: event.target.value})}
                            />
                            {formData.X_URL && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-red-100 hover:bg-red-200"
                                    onClick={() => setFormData({...formData, X_URL: ""})}
                                >
                                    <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
                                </Button>
                            )}
                        </div>
                    {errors.X_URL && (<p className="startup-form_error">{errors.X_URL}</p>)}
                </div>

                {/* LinkedIn */}
                <div>
                    <label htmlFor="linkedInURL" className="startup-form_label">LinkedIn URL</label>
                        <div className="relative">
                            <Input
                                id="linkedInURL"
                                name="linkedInURL"
                                className="startup-form_textarea pr-10"
                                placeholder="Enter Link to Your LinkedIn Profile"
                                value={formData.linkedInURL || ""}
                                onChange={(event) => setFormData({...formData, linkedInURL: event.target.value})}
                            />
                            {formData.linkedInURL && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-red-100 hover:bg-red-200"
                                    onClick={() => setFormData({...formData, linkedInURL: ""})}
                                >
                                    <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
                                </Button>
                            )}
                        </div>
                    {errors.linkedInURL && (<p className="startup-form_error">{errors.linkedInURL}</p>)}
                </div>

                {/* GitHub */}
                <div>
                    <label htmlFor="githubURL" className="startup-form_label">GitHub URL</label>
                        <div className="relative">
                            <Input
                                id="githubURL"
                                name="githubURL"
                                className="startup-form_textarea pr-10"
                                placeholder="Enter Link to Your GitHub Profile"
                                value={formData.githubURL || ""}
                                onChange={(event) => setFormData({...formData, githubURL: event.target.value})}
                            />
                            {formData.githubURL && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-red-100 hover:bg-red-200"
                                    onClick={() => setFormData({...formData, githubURL: ""})}
                                >
                                    <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
                                </Button>
                            )}   
                        </div>
                    {errors.githubURL && (<p className="startup-form_error">{errors.githubURL}</p>)}
                </div>

                <Button 
                    type="submit" 
                    className="startup-form_btn text-white" 
                    disabled={isPending}
                    onClick={async (event) => {
                        event.preventDefault()
                        await handleUpdate(formData)
                    }}
                >
                    {isPending ? (
                        <>
                            Updating...
                            <Loader className="!size-6 ml-1" />
                        </>
                        ) : (
                        <>
                            Update Details
                            <Send className="!size-6 ml-1" />
                        </>
                        )}
                    
                </Button>

            </form>
        </>
    )
}