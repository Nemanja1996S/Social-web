import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { UserFriends } from "../../../models/UserFriends";
import * as Actions from "./userFiends.actions"
import { createReducer, on } from "@ngrx/store";

export interface UserFriendsState extends EntityState<UserFriends>{
    isLoading: boolean
    error: string | null
}

export const adapter = createEntityAdapter({
    selectId: (userFriends: UserFriends) => userFriends.id
})

export const initialState: UserFriendsState = adapter.getInitialState({
    isLoading: false,
    error: null
})

export const userFriendsReducer = createReducer(
    initialState,
    on(Actions.loadUserFriends, (state, {userId}) => {
        return {...state, isLoading: true}
    }),
    on(Actions.loadUserFriendsSuccess, (state, {userFriends}) => {
        const newState = {...state, isLoading: false}
        return adapter.setOne(userFriends, newState);
    }),
    on(Actions.loadUserFriendsFailure, (state, {error}) => {
        return {...state, isLoading: false, error: error}
    })
)
