import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Reaction } from "../../../models/PostReaction";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./postReactions.actions"


export interface PostReactionsState extends EntityState<Reaction> {
    userId: number,
    isLoading: boolean,
    error: string | null
    // reactionToPostsDict: EntityState<postRections>
}

export const adapter = createEntityAdapter<Reaction>({
     selectId: (userReaction) => userReaction.postId
});

export const initialState: PostReactionsState = adapter.getInitialState({
    userId: -1,
    isLoading: false,
    error: null
})

export const postReactionsReducer = createReducer(
    initialState,
    on(Actions.loadPostReactions, (state, {userId}) => {
    return {...state, isLoading: true, userId: userId }
    }),
    on(Actions.loadPostReactionsSuccess, (state, {postReactions}) => {
        adapter.setAll(postReactions, state)
        return {...state, isLoading: false }
    }),
    on(Actions.loadPostReactionsFailure, (state, {error}) => {
        return {...state, isLoading: false, error: error}
    }),
)

