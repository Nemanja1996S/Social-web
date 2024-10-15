import { createEntityAdapter, EntityState } from "@ngrx/entity";
// import { UserFriends } from "../../../models/UserFriends";
import * as Actions from "./friends.actions"
import { createReducer, on } from "@ngrx/store";
import { Friend } from "../../../models/Friends";

export interface FriendsState extends EntityState<Friend>{
    isLoading: boolean
    error: string | null
}

export const adapter = createEntityAdapter({
    selectId: (friend: Friend) => friend.id
})

export const initialState: FriendsState = adapter.getInitialState({
    isLoading: false,
    error: null
})

export const friendsReducer = createReducer(
    initialState,
    on(Actions.loadFriends, (state, {userId}) => {
        return {...state, isLoading: true}
    }),
    on(Actions.loadFriendsSuccess, (state, {friends}) => {
        const newState = {...state, isLoading: false}
        return adapter.setAll(friends, newState);
    }),
    on(Actions.loadFriendsFailure, (state, {error}) => {
        return {...state, isLoading: false, error: error}
    })
)
