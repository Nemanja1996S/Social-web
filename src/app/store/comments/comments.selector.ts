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

// export const commentsDictSelector = createSelector(
//     selectCommentsFeature,
//     (commentsState: CommentsState) => commentsState.entities
// )

// export const postIdSelector = createSelector(
//     commentsSelector,
//     (commentsArray) => { let id = commentsArray.pop()?.postId; if(id) {return id} else return 0 }
// )

