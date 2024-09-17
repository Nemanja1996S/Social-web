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