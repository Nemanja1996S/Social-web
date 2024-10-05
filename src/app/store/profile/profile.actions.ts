import { createAction, props } from "@ngrx/store";
import { User } from "../../../models/User";


export const setIsLoading = createAction("Set isLoading to profileState");

export const loadProfile = createAction(		
	"Load profile from database and set profile to profileState",			
	props<{					
		id: number
	}>()
);

export const loadProfileSuccess = createAction(		
	"Load profile from database and set profile to profileState success",			
	props<{					
		user: User
	}>()
);


export const loadProfileFailure = createAction(		
	"Load profile from database and set profile to profileState failure",			
	props<{					
		error: string
	}>()
);


// export const setSearchSelectedSports = createAction(		
// 	"Set search selected sports",			
// 	props<{					
// 		searchSelectedSports : string[]
// 	}>()
// );

// export const addFriend = createAction(		
// 	"Add friend to profile state",			
// 	props<{					
// 		friendId: number
// 	}>()
// );