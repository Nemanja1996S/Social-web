import { createAction, props } from "@ngrx/store";
import { UpdateUserDto, User } from "../../../models/User";


export const setIsLoading = createAction("Set isLoading to userState");

export const loadUser = createAction(		
	"Load user from database and set user to userState",			
	props<{					
		email: string,
		password: string
	}>()
);

export const loadUserById = createAction(		
	"Load user from database and set user to userState",			
	props<{					
		id: number
	}>()
);

export const loadUserSuccess = createAction(		
	"Load user from database and set user to userState success",			
	props<{					
		user: User
	}>()
);


export const loadUserFailure = createAction(		
	"Load user from database and set user to userState failure",			
	props<{					
		error: string
	}>()
);

export const setSearchSelectedSports = createAction(		
	"Set search selected sports",			
	props<{					
		searchSelectedSports : string[]
	}>()
);

export const addFriend = createAction(		
	"Add friend to database and state",			
	props<{				
		userId: number	
		friendId: number
	}>()
);
export const addFriendSuccess = createAction(		
	"Add friend to database and state success",			
	props<{				
		friendId: number
	}>()
);
export const addFriendFailure = createAction(		
	"Add friend to database and state failure",			
	props<{				
		error: string
	}>()
);

export const removeFriend = createAction(		
	"Remove friend from user state and database",			
	props<{			
		userId: number		
		friendId: number
	}>()
);

export const removeFriendSuccess = createAction(		
	"Remove friend from user state and database success",			
	props<{					
		friendId: number
	}>()
);

export const removeFriendFailure = createAction(		
	"Remove friend from user state and database failure",			
	props<{					
		error: string
	}>()
);

export const deleteUser = createAction(		
	"Delete profile and user from state and database",		
	props<{					
		userId: number
	}>()
);
export const deleteUserSuccess = createAction(		
	"Delete profile and user from state and database success"
);
export const deleteUserFailure = createAction(		
	"Delete profile and user from state and database failure",		
	props<{					
		error: string
	}>()
);

export const editUser = createAction(		
	"Edit profile and user from state and database",		
	props<{					
		updateUserDto: UpdateUserDto
	}>()
);
export const editUserSuccess = createAction(		
	"Edit profile and user from state and database success",
	props<{					
		updateUserDto: UpdateUserDto
	}>()
);
export const editUserFailure = createAction(		
	"Edit profile and user from state and database failure",		
	props<{					
		error: string
	}>()
);