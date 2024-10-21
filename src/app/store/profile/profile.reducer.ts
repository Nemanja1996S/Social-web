import { createReducer, on } from "@ngrx/store";
import { User } from "../../../models/User";
import * as Actions from './profile.actions'
import { MiniFriendRequest } from "../../../models/Request";
import { deleteUserSuccess, editUserSuccess } from "../user/user.actions";


export interface ProfileState{
    user : User;
    request?: MiniFriendRequest
    isLoading: boolean;
    error: string | null
}


export const initialUser: User = {
    id: -1,
    name: '',
    surname: '',
    email: '',
    picture: '',
    friendsIds: [],
    password: '',
    selectedSports: [],
    dateOfBirth: '',
    education: '',
    work: '',
    aboutMe: '',
    requests: []
}

export const initialState: ProfileState = {
    user : initialUser,
    request: {id: -1, toUser: {id: -1}, fromUser: {id: -1}},
    isLoading: false,
    error: null
}

export const profileReducer = createReducer(
    initialState,
    on(Actions.loadProfile, (state, {id}) => {
        return ({...state, isLoading: true })
    }),
    on(Actions.loadProfileSuccess, (state, {user}) =>  {
        return ({...state, isLoading: false, user: user })
    }),
    on(Actions.loadProfileFailure, (state, {error}) =>  {
        return ({...state, isLoading: false, error: error })
    }),
    on(Actions.loadRequestBetweenUsers, (state, {userId, profileUserId}) => {
        return ({...state, isLoading: true })
    }),
    on(Actions.loadRequestBetweenUsersSuccess, (state, {request}) =>  {
        console.log("requets iz baze")
        console.log(request)
        return ({...state, isLoading: false, request: request })
    }),
    on(Actions.loadRequestBetweenUsersFailure, (state, {error}) =>  {
        return ({...state, isLoading: false, error: error })
    }),
    on(Actions.sendRequest, (state, {fromUserId, toUserId}) => {
        return {...state, isLoading: false}
    }),
    on(Actions.sendRequestSuccess, (state, {fromUserId, toUserId}) => {
        
        return {...state, request: {...state.request, id: -1, fromUser: {id: fromUserId}, toUser: {id: toUserId}} , isLoading: false}
    }),
    on(Actions.sendRequestFailure, (state, {error}) => {
        return {...state, isLoading: false, error: error}
    }),
    on(Actions.acceptDeleteRequestSuccess, (state) => {

        return {...state, request: initialState.request}
    }),
    on(Actions.acceptDeleteRequestFailure, (state, {error}) => {
        return {...state, isLoading: false, error: error}
    }),
    on(deleteUserSuccess, (state) => {
        return {...state, user: initialUser}
    }),
    on(editUserSuccess, (state, {updateUserDto}) => {
        let newUser = {...state.user}
        Object.assign(newUser, updateUserDto)
        return ({...state, user: newUser})
    }),
    // on(Actions.setSearchSelectedSports, (state, {searchSelectedSports}) => {
    //     return ({...state, searchSelectedSports: searchSelectedSports})
    // }),
    // on(Actions.addFriend, (state, {friendId}) => {
    //     let newFriendsIds = [...state.user.friendsIds]
    //     newFriendsIds.push(friendId);
    //     return ({...state, user: {...state.user, friendsIds: newFriendsIds}})
    // })
    
)