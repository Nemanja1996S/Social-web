import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Comments, UserComment } from "../../../models/Comment";
import { CommentsState } from "./comments.reducer";
import { Dictionary } from "@ngrx/entity";



export const selectCommentsFeature = (state: AppState) => state.commentsState;

export const commentsSelector = createSelector(
    selectCommentsFeature,
    (commentsState) => commentsState.comments
)

export const userCommentsSelector = createSelector(
    commentsSelector,
    (comments) => comments.userComments
)

export const errorCommentsSelector = createSelector(
    selectCommentsFeature,
    (commentsState) => commentsState.error
)



