import { createReducer, on } from "@ngrx/store";
import { Post } from "../../../models/Post";
import * as Actions from './posts.actions'

export interface PostsState {
    isLoading: boolean,
    posts: Post[],
    error: string | null;
}

const initialState : PostsState = {
    isLoading: false,
    posts: [],
    error: null
}

export const postsReducer = createReducer(
    initialState,
    on(Actions.loadPosts, (state, {id}) => {
    return {...state, isLoading: true}
    }),
    on(Actions.loadPostsSuccess, (state, {posts}) => {
        return {...state, isLoading: false, posts: posts}
    }),
    on(Actions.loadPostsFailure, (state, {error}) => {
        return {...state, isLoading: false, error: error}
    }),
)
