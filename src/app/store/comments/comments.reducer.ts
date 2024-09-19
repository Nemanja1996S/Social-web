import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Comments } from "../../../models/Comment";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./comments.actions"

export interface CommentsState extends EntityState<Comments>{
    isLoading: boolean,
    error: string | null
}

export const adapter = createEntityAdapter({
    selectId: (comment: Comments) => comment.postId
})

export const initialState: CommentsState = adapter.getInitialState({
    isLoading: false,
    error: null
})

export const commentsReducer = createReducer(
    initialState,
    on(Actions.loadComments, (state, {postId}) => {
    return {...state, isLoading: true, postId: postId }
    }),
    on(Actions.loadCommentsSuccess, (state, {comments}) => 
        adapter.setOne(comments, state)
    ),
    on(Actions.loadPostsFailure, (state, {error}) => {
        return {...state, isLoading: false, error: error}
    }),
    on(Actions.unsetIsLoaidng, (state) => {
        return {...state, isLoading: false}
    })
)