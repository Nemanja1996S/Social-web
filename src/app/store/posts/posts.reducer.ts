import { createReducer, on } from "@ngrx/store";
import { Post } from "../../../models/Post";
import * as Actions from './posts.actions'
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { getCurrentDateAndTime } from "../comments/comments.reducer";

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
    on(Actions.deletePost, (state, {postId}) => 
        adapter.removeOne(postId, state)
    ),
    on(Actions.editPost, (state, {postId, postText, postImage}) => {
        if(postText){
            if(postImage){
                return adapter.updateOne({id: postId, changes: {text: postText, image: postImage, date: getCurrentDateAndTime()}}, state)
            }
            else{
                return adapter.updateOne({id: postId, changes: {text: postText, date: getCurrentDateAndTime()}}, state)
            }
        }
        else{
            return adapter.updateOne({id: postId, changes: {image: postImage, date: getCurrentDateAndTime()}}, state)
        }
        
    }
        
    ),
    on(Actions.loadPostsForSports, (state, {userId, selectedSports}) => {
        return {...state, isLoading: true}
    }),
    on(Actions.loadPostsForSportsSuccess, (state, {posts}) => 
        adapter.setAll(posts, state)
    ),
    on(Actions.loadPostsForSportsFailure, (state, {error}) => {
        return {...state, isLoading: false, error: error}
    }),
)
