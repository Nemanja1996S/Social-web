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
    on(Actions.makeComment, (state, {userComment}) => {
        let userComm = {...userComment, commentDate: getCurrentDateAndTime() }
        let userComms: UserComment[] = state.comments.userComments;
        //userComms.push(userComm);
        return {...state, comments: {...state.comments, userComments: [...state.comments.userComments, userComm]}}

    }),
    on(Actions.editUserComment, (state, { userComment}) => {
        const userComms: UserComment[] = state.comments.userComments;
        const userComm: UserComment | undefined = userComms.find(userComm => userComm.commentDate === userComment.commentDate);
        if(userComm){
            const editedUserComm: UserComment = {...userComm, commentText: userComment.commentText, commentPic: userComment.commentPic, commentDate: getCurrentDateAndTime()}
            return {...state, comments: {...state.comments,
                 userComments: [...state.comments.userComments
                    .filter(userCom => userCom.commentDate !== userComment.commentDate), editedUserComm]}}  //, editedUserComm 
        }
        else{
            return {...state}
        }
    })
    // on(Actions.unsetIsLoaidng, (state) => {
    //     return {...state, isLoading: false}
    // })
)

 export function getCurrentDateAndTime(): string{
    let date: Date = new Date();
    return `${date.getDate().toString().padStart(2, '0')}.${date.getMonth().toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}