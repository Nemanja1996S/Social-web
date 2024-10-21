import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { FriendRequest } from "../../../models/Request";
import * as Actions from "./requests.actions"
import { createReducer, on } from "@ngrx/store";

export interface RequestsState{
    userId: number
    friendRequests: FriendRequest[]
    isLoading: boolean,
    error: string | null
}

export const initialState: RequestsState = {
    userId: -1,
    friendRequests: [],
    isLoading: false,
    error: null
}

export const friendRequestsReducer = createReducer(
    initialState,
    on(Actions.loadRequests, (state, {userId}) => {
    return {...state, isLoading: true, userId: userId }
    }),
    on(Actions.loadRequestsSuccess, (state, {friendRequests}) => {
        // adapter.setAll(postReactions, state)
        return {...state, friendRequests: friendRequests, isLoading: false, }
    }),
    on(Actions.loadRequestsFailure, (state, {error}) => {
        return {...state, isLoading: false, error: error}
    }),
    on(Actions.deleteRequest, (state, {friendRequest}) => {
        return {...state, friendRequests: [...state.friendRequests.filter(request => request !== friendRequest)]}
    }),
    // on(Actions.acceptRequest, (state, {friendRequest}) => {
    //     return {...state, friendRequests: [...state.friendRequests.filter(request => request !== friendRequest)]}
    // }),
    on(Actions.deleteRequestSuccess, (state, {friendRequest}) => {
        return {...state, friendRequests: [...state.friendRequests.filter(request => request !== friendRequest)]}
    }),
    on(Actions.deleteRequestFailure, (state, {error}) => {
        return {...state, isLoading: false, error: error}
    }),
    
);