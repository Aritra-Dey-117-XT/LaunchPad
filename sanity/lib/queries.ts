import { defineQuery } from "next-sanity"

// STARTUP Queries
export const STARTUP_QUERY = defineQuery(`
    *[_type=='startup' && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search ] | order(_createdAt desc) {
        _id,
        title,
        slug,
        description,
        _createdAt,
        image,
        author -> {
            _id,
            id,
            name,
            username,
            email,
            image,
            bio
        },
        views,
        category,
        pitch,
        }
    `)

export const STARTUP_BY_AUTHOR_QUERY = defineQuery(`
    *[_type=='startup' && author._ref==$uid ] | order(_createdAt desc) {
        _id,
        title,
        slug,
        description,
        _createdAt,
        image,
        author -> {
            _id,
            id,
            name,
            username,
            email,
            image,
            bio
        },
        views,
        category,
        pitch,
        }
    `)

export const STARTUP_BY_ID_QUERY = defineQuery(`
    *[_type=='startup' && _id==$id ][0] {
        _id,
        title,
        slug,
        description,
        _createdAt,
        image,
        author -> {
            id,
            name,
            username,
            email,
            image,
            bio
        },
        views,
        category,
        pitch,
        }
    `)

export const STARTUP_VIWES_BY_ID_QUERY = defineQuery(`
    *[_type=='startup' && _id==$id][0] {
        _id,
        views  
        }
    `)

// AUTHOR Queries

// Handles both Github and Google IDs
export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
    *[_type=='author' && id==$id][0] {
        id,
        name,
        username,
        email,
        image,
        bio
        }    
    `)

export const AUTHOR_BY_EMAIL_ID_QUERY = defineQuery(`
    *[_type=='author' && email==$email][0] {
        id,
        name,
        username,
        email,
        image,
        bio
        }    
    `)

export const AUTHOR_BY_EMAIL_QUERY = defineQuery(`
    *[_type=='author' && email==$email][0] {
        _id
        }
    `)

export const AUTHOR_BY_USERID_QUERY = defineQuery(`
    *[_type=='author' && _id==$uid][0] {
        id,
        name,
        username,
        email,
        image,
        bio,
        instagramURL,
        linkedInURL,
        facebookURL,
        X_URL,
        githubURL
        }  
    `)

// PLAYLIST Queries
export const PLAYLIST_BY_SLUG_QUERY = defineQuery(`
    *[_type=='playlist' && slug.current==$slug][0] {
        _id,
        title,
        slug,
        select[]->{
            _id,
            _createdAt,
            title,
            slug,
            author->{
            _id,
            name,
            slug,
            image,
            bio
            },
            views,
            description,
            category,
            image,
            pitch
            }
        }
    `)
