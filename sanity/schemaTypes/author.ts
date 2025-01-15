import { defineType, defineField } from 'sanity'
import { UserIcon } from 'lucide-react'

export const author = defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    icon: UserIcon,
    fields: [
        defineField({
            name: 'id',
            type: 'string',
        }),
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'username',
            type: 'string',
        }),
        defineField({
            name: 'email',
            type: 'string',
        }),
        defineField({
            name: 'image',
            type: 'url',
        }),
        defineField({
            name: 'bio',
            type: 'text',
        }),
        defineField({
            name: 'linkedInURL',
            type: 'string'
        }),
        defineField({
            name: 'instagramURL',
            type: 'string'
        }),
        defineField({
            name: 'facebookURL',
            type: 'string'
        }),
        defineField({
            name: 'X_URL',
            type: 'string'
        }),
        // defineField({
        //     name: 'emailURL',
        //     type: 'string'
        // }),
        defineField({
            name: 'githubURL',
            type: 'string'
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'username'
        }
    }
})