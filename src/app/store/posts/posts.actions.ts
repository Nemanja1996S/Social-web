import { createAction, props } from "@ngrx/store";
import { Post } from "../../../models/Post"

export const loadPosts = createAction(
    "[Post Component] Loading post",
    props<{
        id: number
    }>()
);

export const loadPostsSuccess = createAction(
    "[Post Component] Load post success",
    props<{
        posts: Post[]
    }>()
);

export const loadPostsFailure = createAction(
    "[Post Component] Load post failure",
    props<{
        error: string
    }>()
);


