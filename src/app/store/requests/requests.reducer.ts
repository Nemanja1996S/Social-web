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
    on(Actions.acceptRequest, (state, {friendRequest, userId, acceptedUserId}) => {
        return {...state, friendRequests: [...state.friendRequests.filter(request => request !== friendRequest)]}
    }),
    on(Actions.sendRequest, (state, {friendRequest}) => {
        const request = state.friendRequests.find(request =>
             request.fromUserId === friendRequest.fromUserId && request.toUserId === friendRequest.toUserId)
            //  .map(request => request.fromUserFriendsIds)
        if(request){
            // const fromUserIds = request.fromUserFriendsIds
            // const newfromUserIds = [...fromUserIds, friendRequest.fromUserId]
            return {...state}//, friendRequests: [...state.friendRequests.map(req => req.fromUserId), friendRequest]}
        }
        else{
            // const oldFriendRequests = [...state.friendRequests]
            // const oldFromIds = []
            // oldFriendRequests.map(req => oldFromIds.push(req.fromUserFriendsIds))
            return {...state, friendRequests: [...state.friendRequests, friendRequest]}
        }
        
    }),
);