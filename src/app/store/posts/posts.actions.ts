import { createAction, props } from "@ngrx/store";
import { Post } from "../../../models/Post"

export const loadPosts = createAction(
    "Loading posts to state",
    props<{
        userId: number
    }>()
);

export const loadPostsSuccess = createAction(
    "Loading post to state success",
    props<{
        posts: Post[]
    }>()
);

export const loadPostsFailure = createAction(
    "Loading post to state failure",
    props<{
        error: string
    }>()
);

export const deletePost = createAction(
    "Loading post to state failure",
    props<{
        postId: number
    }>()
);

export const editPost = createAction(
    "Edit post",
    props<{
        postId: number
        postText?: string
        postImage?: string
    }>()
);

export const loadPostsForSports = createAction(
    "Loading posts to state for selected sports",
    props<{
        userId: number,
        selectedSports: string[]
    }>()
);

export const loadPostsForSportsSuccess = createAction(
    "Loading post to state for selected sports success",
    props<{
        posts: Post[]
    }>()
);

export const loadPostsForSportsFailure = createAction(
    "Loading post to state for selected sports failure",
    props<{
        error: string
    }>()
);

export const likePost = createAction(
    "Changing "
)


