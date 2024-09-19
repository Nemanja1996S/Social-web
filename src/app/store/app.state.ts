import { CommentsState } from "./comments/comments.reducer";
import { PostsState } from "./posts/posts.reducer";
import { UserState } from "./users/users.reducer";

export interface AppState {
	userState : UserState,
	postsState: PostsState,
	commentsState: CommentsState
}