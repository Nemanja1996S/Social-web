import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { userIdSelector, userSelector } from "../user/user.selector";
import { profileIdSelector } from "../profile/profile.selectors";

export const selectRequestsFeature = (state: AppState) => state.friendRequestsState;

export const friendRequestsSelector = createSelector(
    selectRequestsFeature,
    (friendRequestsState) => friendRequestsState.friendRequests
)

// export const idsOfloggedUserSentRequestToSelector = createSelector(
//     userIdSelector,
//     friendRequestsSelector,
//     (userId, requests) => requests.filter(request => request.fromUserId === userId).map(request => request.toUserId)
// )

// export const isloggedUserSentRequestToProfileUserSelector = createSelector(
//     profileIdSelector,
//     idsOfloggedUserSentRequestToSelector,
//     (profileId, ids) => ids.includes(profileId)
// )
