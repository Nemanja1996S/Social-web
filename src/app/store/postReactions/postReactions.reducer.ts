import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { UserPostReaction, } from "../../../models/PostReaction";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./postReactions.actions"


export interface PostReactionsState {
    userPostReactions: UserPostReaction[]
    isLoading: boolean,
    error: string | null
    // reactionToPostsDict: EntityState<postRections>
}

// export const adapter = createEntityAdapter<Reaction>({
//      selectId: (userReaction) => userReaction.postId
// });

// export const initialState: PostReactionsState = adapter.getInitialState({
//     userId: -1,
//     isLoading: false,
//     error: null
// })

export const initialState: PostReactionsState = {
    userPostReactions: [],
    isLoading: false,
    error: null
}

export const postReactionsReducer = createReducer(
    initialState,
    on(Actions.loadPostReactions, (state, {userId}) => {
    return {...state, isLoading: true }
    }),
    on(Actions.loadPostReactionsSuccess, (state, {userPostReactions}) => {
        // adapter.setAll(postReactions, state)
        return {...state, userPostReactions: userPostReactions, isLoading: false }
    }),
    on(Actions.loadPostReactionsFailure, (state, {error}) => {
        return {...state, isLoading: false, error: error}
    }),
)

