import { createAction, props } from "@ngrx/store";
import { UserPostReaction } from "../../../models/PostReaction";

export const loadPostReactions = createAction(
    "Loading post reactions to state",
    props<{
        userId: number
    }>()
);

export const loadPostReactionsSuccess = createAction(
    "Loading post reactions to state success",
    props<{
        userPostReactions: UserPostReaction[]
    }>()
);

export const loadPostReactionsFailure = createAction(
    "Loading post reactions to state failure",
    props<{
        error: string
    }>()
);