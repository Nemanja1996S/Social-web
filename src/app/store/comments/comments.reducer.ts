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
    const coms : Comments = {...state.comments, postId: postId}
    return {...state, isLoading: true, comments: coms }
    }),
    on(Actions.loadCommentsSuccess, (state, {comments}) => {
        // adapter.setOne(comments, state)
        return {...state, isLoading: false, comments: comments}
    }),
    on(Actions.loadPostsFailure, (state, {error}) => {
        return {...state, isLoading: false, error: error}
    }),
    on(Actions.deleteUserComment, (state, {userComment}) => {
        const userComms : UserComment[] = state.comments.userComments.filter(userComm => userComm !== userComment)
        const comms : Comments = {...state.comments, userComments: userComms}
        return {...state, comments: comms }
    }),
    on(Actions.editUserComment, (state, { userComment}) => {
        const comms: Comments = state.comments
        const userComms: UserComment[] = state.comments.userComments;
        const userComm: UserComment | undefined = userComms.find(userComm => userComm.commentDate === userComment.commentDate);
        if(userComm){
            let date: Date = new Date();
            const editedUserComm: UserComment = {...userComm, commentText: userComment.commentText, commentPic: userComment.commentPic, commentDate: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}
            //return {...state, comments: ({...comments, userComments: ({...userComments, commentText: userComment.commentText, commentPic: userComment.commentPic, commentDate: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}) }) }
            // const editedUserComms: UserComment[] = {...userComms, userComm}
            let editedUserComms: UserComment[] = userComms.filter(userC => userC !== userComm);
            editedUserComms.push(editedUserComm)
            const comms : Comments = {...state.comments, userComments: editedUserComms}
            return {...state, comments: comms }
        }
        else{
            return {...state}
        }
    })
    // on(Actions.unsetIsLoaidng, (state) => {
    //     return {...state, isLoading: false}
    // })
)