import { createReducer, on } from "@ngrx/store";
import { User } from "../../../models/User";
import * as Actions from './users.actions'

export interface UserState{
    user : User;
    loadSuccessfull: boolean;
    friends: ReadonlyArray<User>;
    selectedSport: string;
}

 const initialUser: User = {
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
    loadSuccessfull: false,
    friends: [],
    selectedSport: ""
}

export const userReducer = createReducer(
    initialState,
    on(Actions.setUser, (state, {user}) =>  {
        return {...state, user: user }
    }

    )
    
)

