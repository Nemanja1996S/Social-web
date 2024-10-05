import { CommentsState } from "./comments/comments.reducer";
import { PostsState } from "./posts/posts.reducer";
import { UserFriendsState } from "./userFriends/userFriends.reducer";
import { UserState } from "./user/user.reducer";
import { RequestsState } from "./requests/requests.reducer";
import { ProfileState } from "./profile/profile.reducer";
// import { PostReactionsState } from "./postReactions/postReactions.reducer";

export interface AppState {
	userState : UserState,
	postsState: PostsState,
	commentsState: CommentsState,
	userFriendsState: UserFriendsState,
	friendRequestsState: RequestsState,
	profileState: ProfileState
	// postReactionsState: PostReactionsState
}