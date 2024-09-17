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

export const likePost = createAction(
    "Changing "
)


