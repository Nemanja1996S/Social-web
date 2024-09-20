import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Comments, UserComment } from "../../../models/Comment";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./comments.actions"

export interface CommentsState {
    comments: Comments
    isLoading: boolean,
    error: string | null
}

// export const adapter = createEntityAdapter({
//     selectId: (comment: Comments) => comment.postId
// })

export const initialUserComment: UserComment = {
    userId: -1,
    userFullName: '',
    userPicSrc: '',
    commentText: '',
    commentPic: '',
    commentDate: ''
}

export const initialComment: Comments = {
    id: -1,
    postId: -1,
    userComments: []
}

export const initialState: CommentsState = {
    comments: initialComment,
    isLoading: false,
    error: null
}

export const commentsReducer = createReducer(
    initialState,
    on(Actions.loadComments, (state, {postId}) => {
    let coms : Comments = {...state.comments, postId: postId}
    return {...state, isLoading: true, comments: coms }
    }),
    on(Actions.loadCommentsSuccess, (state, {comments}) => {
        // adapter.setOne(comments, state)
        return {...state, isLoading: false, comments: comments}
    }),
    on(Actions.loadPostsFailure, (state, {error}) => {
        return {...state, isLoading: false, error: error}
    }),
    // on(Actions.unsetIsLoaidng, (state) => {
    //     return {...state, isLoading: false}
    // })
)