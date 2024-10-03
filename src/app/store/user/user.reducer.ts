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
    on(Actions.loadUserSuccess, (state, {user}) =>  {
        return ({...state, isLoading: false, user: user })
    }),
    on(Actions.loadUserFailure, (state, {error}) =>  {
        return ({...state, isLoading: false, error: error })
    }),
    on(Actions.setSearchSelectedSports, (state, {searchSelectedSports}) => {
        return ({...state, searchSelectedSports: searchSelectedSports})
    })
    
)

