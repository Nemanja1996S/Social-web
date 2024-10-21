import { createAction, props } from "@ngrx/store";
import { User } from "../../../models/User";
import { MiniFriendRequest } from "../../../models/Request";


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

export const loadRequestBetweenUsers = createAction(		
	"Load request between logged user and profile user",			
	props<{					
		userId: number,
		profileUserId: number
	}>()
);
export const loadRequestBetweenUsersSuccess = createAction(		
	"Load request between logged user and profile user success, state change",			
	props<{					
		request: MiniFriendRequest
	}>()
);
export const loadRequestBetweenUsersFailure = createAction(		
	"Load request between logged user and profile user success, state change",			
	props<{					
		error: string
	}>()
);

export const sendRequest = createAction(
    "Sending request",
    props<{
        toUserId: number
        fromUserId: number
    }>()
);
export const sendRequestSuccess = createAction(
    "Sending request success",
    props<{
        toUserId: number
        fromUserId: number
    }>()
);
export const sendRequestFailure = createAction(
    "Sending request failure",
    props<{
        error: string
    }>()
);

export const acceptDeleteRequest = createAction(
    "Accepting/deleting request",
    props<{
        requestId: number
    }>()
);
export const acceptDeleteRequestSuccess = createAction(
    "Accepting/deleting request success",
);
export const acceptDeleteRequestFailure = createAction(
    "Accepting/deleting request failure",
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