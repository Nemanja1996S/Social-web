import { createReducer, on } from "@ngrx/store";
import { Post } from "../../../models/Post";
import * as Actions from './posts.actions'
import { createEntityAdapter, EntityState } from "@ngrx/entity";

export interface PostsState extends EntityState<Post> {
    isLoading: boolean,
    // posts: Post[],
    error: string | null;
}

const adapter = createEntityAdapter<Post>({
    selectId: (post: Post) => post.id,
    sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState : PostsState = adapter.getInitialState({
    isLoading: false,
    // posts: [],
    error: null
})

export const postsReducer = createReducer(
    initialState,
    on(Actions.loadPosts, (state, {userId}) => {
    return {...state, isLoading: true}
    }),
    on(Actions.loadPostsSuccess, (state, {posts}) => 
         adapter.setAll(posts, state) //return {...state, isLoading: false, posts: posts
    ),
    on(Actions.loadPostsFailure, (state, {error}) => {
        return {...state, isLoading: false, error: error}
    }),
)
