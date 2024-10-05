import { createReducer, on } from "@ngrx/store";
import { User } from "../../../models/User";
import * as Actions from './profile.actions'

export interface ProfileState{
    user : User;
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
    aboutMe: ''
}

export const initialState: ProfileState = {
    user : initialUser,
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
    })
    // on(Actions.setSearchSelectedSports, (state, {searchSelectedSports}) => {
    //     return ({...state, searchSelectedSports: searchSelectedSports})
    // }),
    // on(Actions.addFriend, (state, {friendId}) => {
    //     let newFriendsIds = [...state.user.friendsIds]
    //     newFriendsIds.push(friendId);
    //     return ({...state, user: {...state.user, friendsIds: newFriendsIds}})
    // })
    
)