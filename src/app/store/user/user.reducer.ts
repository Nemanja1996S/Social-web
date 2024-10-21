import { createReducer, on } from "@ngrx/store";
import { User } from "../../../models/User";
import * as Actions from './user.actions'

export interface UserState{
    user : User;
    isLoading: boolean;
    error: string | null;
    searchSelectedSports: string[] 
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
    requests: [],
    dateOfBirth: '',
    education: '',
    work: '',
    aboutMe: ''
}

export const initialState: UserState = {
    user : initialUser,
    isLoading: false,
    // friends: [],
    // ]]]selectedSport: [],
    searchSelectedSports: [],
    error: null
}

export const userReducer = createReducer(
    initialState,
    on(Actions.setIsLoading, (state) => {
        return ({...state, isLoading: true })
    }),
    on(Actions.loadUser, (state, {email, password}) => {
        return ({...state, isLoading: true, searchSelectedSports: [] })
    }),
    on(Actions.loadUserById, (state, {id}) => {
        return ({...state, isLoading: true, searchSelectedSports: [] })
    }),
    on(Actions.loadUserSuccess, (state, {user}) =>  {
        return ({...state, isLoading: false, user: user })
    }),
    on(Actions.loadUserFailure, (state, {error}) =>  {
        return ({...state, isLoading: false, error: error })
    }),
    on(Actions.setSearchSelectedSports, (state, {searchSelectedSports}) => {
        return ({...state, searchSelectedSports: searchSelectedSports})
    }),
    on(Actions.addFriendSuccess, (state, {friendId}) => {
        let newFriendsIds = [...state.user.friendsIds]
        newFriendsIds.push(friendId);
        return ({...state, user: {...state.user, friendsIds: newFriendsIds}})
    }),
    on(Actions.addFriendFailure, (state, {error}) =>  {
        return ({...state, isLoading: false, error: error })
    }),
    on(Actions.removeFriendSuccess, (state, {friendId}) => {
        return ({...state, user: {...state.user, friendsIds: [...state.user.friendsIds.filter(id => id !== friendId)]}})
    }),
    on(Actions.removeFriendFailure, (state, {error}) =>  {
        return ({...state, isLoading: false, error: error })
    }),
    on(Actions.deleteUserSuccess, (state) => {
        state = initialState
        return state
    }),
    on(Actions.deleteUserFailure, (state, {error}) => {
        return ({...state, isLoading: false, error: error })
    }),
    on(Actions.editUserSuccess, (state, {updateUserDto}) => {
        let newUser = {...state.user}
        Object.assign(newUser, updateUserDto)
        return ({...state, user: newUser, isLoading: false})
    }),
    on(Actions.editUserFailure, (state, {error}) => {
        return ({...state, isLoading: false, error: error })
    }),
    
)

