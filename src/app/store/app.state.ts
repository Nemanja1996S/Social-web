import { CommentsState } from "./comments/comments.reducer";
import { PostsState } from "./posts/posts.reducer";
// import { UserFriendsState } from "./friends/friends.reducer";
import { UserState } from "./user/user.reducer";
import { RequestsState } from "./requests/requests.reducer";
import { ProfileState } from "./profile/profile.reducer";
import { FriendsState } from "./friends/friends.reducer";
// import { PostReactionsState } from "./postReactions/postReactions.reducer";

export interface AppState {
	userState : UserState,
	postsState: PostsState,
	commentsState: CommentsState,
	// userFriendsState: UserFriendsState,
	friendsState: FriendsState,
	friendRequestsState: RequestsState,
	profileState: ProfileState
	// postReactionsState: PostReactionsState
}