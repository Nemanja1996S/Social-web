import { createEntityAdapter, Dictionary, EntityState } from "@ngrx/entity";
import { Reaction } from "../../../models/UsersReactionsToPosts";


export interface UserReactionsToPostsState {
    userId : number
    usersReactionToPostDict : EntityState<PostReactionState>
}

export interface PostReactionState{
    postId : number,
    reaction : Reaction
}

export const userReactionToPostsAdapter = createEntityAdapter<UserReactionsToPostsState>({
    selectId: (userReaction) => userReaction.userId
})

export const postReactionAdapter = createEntityAdapter<PostReactionState>({
    selectId: (postReacton) => postReacton.postId
})

export const postReactionInitialState: PostReactionState = postReactionAdapter.getInitialState({
    postId: -1,
    reaction: 0,
    ids: [],
    entities: []
})

// export const initialState : UserReactionsToPostsState = userReactionToPostsAdapter.getInitialState({
//     userId: -1,
//     usersReactionToPostDict : postReactionInitialState,
// })

