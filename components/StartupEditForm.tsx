"use client"

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from '@uiw/react-md-editor'
import { Button } from "./ui/button";
import { Send, Loader } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod"
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

const StartupEditForm = ({ post }: { post : any}) => {

    const [errors, setErrors] = useState<Record<string, string>>({});
    const { toast } = useToast()
    const router = useRouter()
    const [isPending, setPending] = useState(false);
    const [formData, setFormData] = useState({
        title: post.title,
        description: post.description,
        category: post.category,
        link: post.image,
        pitch: post.pitch
    })
  
    const handleEdit = async (formData: Object) => {

            try {
                await formSchema.parseAsync(formData)
                Swal.fire({
                    title: "Are you sure to UPDATE the Startup?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, UPDATE my Startup!"
                }).then(async (swalResult) => {
                    if(swalResult.isConfirmed) {

                        setPending(true)
                        const result = await axios.patch("/api/editPost", {data: {id: post._id, formData: formData}})

                        if(result.status == 200) {

                            Swal.fire({
                                title: "SUCCESS!",
                                text: "Your Startup has been Updated Successfully!",
                                icon: "success"
                            })

                            router.push(`/startup/${post._id}`)
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
                    <label htmlFor="title" className="startup-form_label">Title</label>
                    <Input
                        id="title"
                        name="title"
                        className="startup-form_input"
                        required
                        placeholder="Startup Title"
                        value={formData.title}
                        onChange={(event) => setFormData({...formData, title: event.target.value})}
                    />

                    {errors.title && <p className="startup-form_error">{errors.title}</p>}
                </div>

                <div>
                    <label htmlFor="description" className="startup-form_label">Description</label>
                    <Textarea
                        id="description"
                        name="description"
                        className="startup-form_textarea"
                        required
                        placeholder="Startup Description"
                        value={formData.description}
                        onChange={(event) => setFormData({...formData, description: event.target.value})}
                    />

                    {errors.description && (
                        <p className="startup-form_error">{errors.description}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="category" className="startup-form_label">Category</label>
                    <Input
                        id="category"
                        name="category"
                        className="startup-form_input"
                        required
                        placeholder="Startup Category (Tech, Health, Education...)"
                        value={formData.category}
                        onChange={(event) => setFormData({...formData, category: event.target.value})}
                    />

                    {errors.category && (
                        <p className="startup-form_error">{errors.category}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="link" className="startup-form_label">Image URL</label>
                    <Input
                        id="link"
                        name="link"
                        className="startup-form_input"
                        required
                        placeholder="Startup Image URL"
                        value={formData.link}
                        onChange={(event) => setFormData({...formData, link: event.target.value})}
                    />

                    {errors.link && <p className="startup-form_error">{errors.link}</p>}
                </div>

                <div data-color-mode='light'>
                    <label htmlFor="pitch" className="startup-form_label">Pitch</label>
                    <MDEditor
                        id="pitch"
                        preview="edit"
                        height={300}
                        style={{ borderRadius: 20, overflow: "hidden" }}
                        textareaProps={{
                            placeholder:
                            "Briefly describe your idea and what problem it solves",
                        }}
                        previewOptions={{
                            disallowedElements: ["style"],
                        }}
                        value={formData.pitch}
                        onChange={(value) => setFormData({...formData, pitch: value})}
                    />

                    {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
                </div>

                <Button 
                    type="submit" 
                    className="startup-form_btn text-white" 
                    disabled={isPending}
                    onClick={async (event) => {
                        event.preventDefault()
                        await handleEdit(formData)
                    }}
                >
                    {isPending ? (
                        <>
                            Submitting...
                            <Loader className="!size-6 ml-1" />
                        </>
                        ) : (
                        <>
                            Submit Your Pitch
                            <Send className="!size-6 ml-1" />
                        </>
                        )}
                    
                </Button>

            </form>
        </>
    )
}

export default StartupEditForm