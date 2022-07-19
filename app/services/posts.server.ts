import { db } from '~/services/db.server';

import type { Post } from "@prisma/client";
export type { Post };

export const getPosts = () => db.post.findMany({ include: {
    User: {
        select: {
            email: true,
            id: true
        }
    }
}});

export const createPost = ({title, body, userId}: Pick<Post, 'title' | 'body' | 'userId'>) => {
    return db.post.create({data: {title, body, userId}});
}