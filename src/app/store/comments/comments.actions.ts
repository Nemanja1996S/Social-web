import { createAction, props } from "@ngrx/store";
import { Comments, UserComment } from "../../../models/Comment";

export const loadComments = createAction(
    "Loading comments to state",
    props<{
        postId: number
    }>()
);

export const loadCommentsSuccess = createAction(
    "Loading comments to state success",
    props<{
        comments: Comments // usersComments: UserComment[]
    }>()
);

export const loadCommentsFailure = createAction(
    "Loading comments to state failure",
    props<{
        error: string
    }>()
);

export const deleteUserComment = createAction(
    "Deleting user comment",
    props<{
        userComment: UserComment
    }>()
);

export const makeComment = createAction(
    "Making user comment",
    props<{
        postId: number,
        userComment: UserComment
    }>()
);

export const makeCommentSuccess = createAction(
    "Making user comment success",
    props<{
        // postId: number,
        userComment: UserComment
    }>()
);

export const makeCommentFailure = createAction(
    "Making user comment failure",
    props<{
        // postId: number,
        error: string
    }>()
);

export const editUserComment = createAction(
    "Editing user comment",
    props<{
        // postId: number,
        userComment: UserComment
    }>()
);