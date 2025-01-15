import { z } from "zod"

export const formSchema = z.object({

    title: z.string()
            .min(3)
            .max(25),
    description: z.string()
                    .min(20)
                    .max(350),
    category: z.string()
                .min(2)
                .max(20)
                .refine((value) => !/\s/.test(value), { message: "Category cannot contain spaces" }),
    link: z.string()
            .url()
            .refine((url) => {
                const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp']
                return imageExtensions.some(ext => url.toLowerCase().endsWith(ext))
              }, "URL must end with a valid image extension"),
            // .refine(async (url) => {
            //     try {
            //         const res = await fetch(url, {method: "HEAD"})
            //         const contentType = res.headers.get('content-type')
            //         return contentType?.startsWith("image/")

            //     } catch (error) {
            //         return false
            //     }
            // }, { message: "Link must be a valid Image URL" }),
    pitch: z.string()
            .min(100),
})

export const userSchema = z.object({

        displayName: z.string()
                .min(3)
                .max(25)
                .refine((value) => !/\s/.test(value[0]), { message: "Name Cannot start with Empty Space" }),
        profileImage: z.string()
                .url(),
        bio: z.string()
                .min(15)
                .max(250),
        instagramURL: z.string()
                        .url()
                        .refine((url) => url.startsWith("https://www.instagram.com/"), {
                                message: " -- Link Must be a Valid Instagram URL"
                        })
                        .or(z.literal(""))
                        .or(z.literal(null)),
        facebookURL: z.string()
                        .url()
                        .refine((url) => url.startsWith("https://www.facebook.com/"), {
                                message: " -- Link Must be a Valid Facebook URL"
                        })
                        .or(z.literal(""))
                        .or(z.literal(null)),
        linkedInURL: z.string()
                        .url()
                        .refine((url) => url.startsWith("https://www.linkedin.com/"), {
                                message: " -- Link Must be a Valid LinkedIn URL"
                        })
                        .or(z.literal(""))
                        .or(z.literal(null)),
        githubURL: z.string()
                        .url()
                        .refine((url) => url.startsWith("https://github.com/"), {
                                message: " -- Link Must be a Valid GitHub URL"
                        })
                        .or(z.literal(""))
                        .or(z.literal(null)),
        X_URL: z.string()
                        .url()
                        .refine((url) => url.startsWith("https://x.com/"), {
                                message: " -- Link Must be a Valid X.com URL"
                        })
                        .or(z.literal(""))
                        .or(z.literal(null)),
    })