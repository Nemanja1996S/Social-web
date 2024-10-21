import { createAction, props } from "@ngrx/store";
import { FriendRequest } from "../../../models/Request";


export const loadRequests = createAction(
    "Loading requests to state",
    props<{
        userId: number
    }>()
);

export const loadRequestsSuccess = createAction(
    "Loading requests to state success",
    props<{
        friendRequests: FriendRequest[]
    }>()
);

export const loadRequestsFailure = createAction(
    "Loading request to state failure",
    props<{
        error: string
    }>()
);



// export const deleteRequest = createAction(
//     "Deleting request",
//     props<{
//         friendRequest: FriendRequest
//     }>()
// );

export const deleteRequest = createAction(
    "Delete request",
    props<{
        // userId: number,
        // acceptedUserId: number,
        friendRequest: FriendRequest
    }>()
);

export const deleteRequestSuccess = createAction(
    "Delete request success",
    props<{
        // userId: number,
        // acceptedUserId: number,
        friendRequest: FriendRequest
    }>()
);

export const deleteRequestFailure = createAction(
    "Delete request failure",
    props<{
        error: string;
    }>()
);