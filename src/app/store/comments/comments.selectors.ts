import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Comments, UserComment } from "../../../models/Comment";
import { adapter, CommentsState } from "./comments.reducer";
import { Dictionary } from "@ngrx/entity";



export const selectCommentsFeature = (state: AppState) => state.commentsState;

export const commentsSelector = createSelector(
    selectCommentsFeature,
    (commentsState) => Object
    .values(commentsState.entities).filter(comments => comments != null).map(comments => <Comments>comments)
)

export const commentsDictSelector = createSelector(
    selectCommentsFeature,
    (commentsState: CommentsState) => commentsState.entities
)

export const postIdSelector = createSelector(
    commentsSelector,
    (commentsArray) => { let id = commentsArray.pop()?.postId; if(id) {return id} else return -1 }
)

export const userCommentsSelector = createSelector(
    commentsDictSelector,
    postIdSelector,
    (dict : Dictionary<Comments>, id: number) => dict[id]?.userComments 
)

