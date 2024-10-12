import { createAction, props } from "@ngrx/store";
import { User } from "../../../models/User";


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
	"Add friend to user state",			
	props<{					
		friendId: number
	}>()
);

export const removeFriend = createAction(		
	"Remove friend to user state",			
	props<{					
		friendId: number
	}>()
);

export const deleteUser = createAction(		
	"Delete profile and user from state",			
	
);