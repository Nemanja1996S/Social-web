import { createReducer, on } from "@ngrx/store";
import { User } from "../../../models/User";
import * as Actions from './users.actions'

export interface UserState{
    user : User;
    isLoading: boolean;
    friends: ReadonlyArray<User>;
    selectedSport: string;
    error: string | null;
    
}

export const initialUser: User = {
    id: -1,
    name: '',
    surname: '',
    email: '',
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
    friends: [],
    selectedSport: "",
    error: null
}

export const userReducer = createReducer(
    initialState,
    on(Actions.setIsLoading, (state) => {
        return ({...state, isLoading: true })
    }),
    on(Actions.setUser, (state, {user}) =>  {
        return ({...state, user: user })
    }

    )
    
)

