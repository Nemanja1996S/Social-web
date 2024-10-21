import { createReducer, on } from "@ngrx/store";
import { Post, ReactionEnum, UserReaction } from "../../../models/Post";
import * as Actions from './posts.actions'
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { getCurrentDateAndTime } from "../comments/comments.reducer";
import { deleteUserCommentSuccess } from "../comments/comments.actions";

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
         adapter.setAll(posts, state)
        //  return {...state, isLoading: false};//return {...state, isLoading: false, posts: posts
    ),
    on(Actions.loadPostsFailure, (state, {error}) => {
        return {...state, isLoading: false, error: error}
    }),
    on(Actions.addPostsFailure, (state, {error}) => {
        return {...state, isLoading: false, error: error}
    }),
    on(Actions.deletePostSuccess, (state, {postId}) => 
        adapter.removeOne(postId, state)
    ),
    on(Actions.deletePostFailure, (state, {error}) => {
        return {...state, error: error}
    }),  
    on(Actions.editPostSuccess, (state, {postId, postText, postImage}) => {
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
    }),
    on(Actions.editPostFailure, (state, {error}) => {
        return {...state, error: error}
    }),
    on(Actions.reactToPostSuccess, (state, {post, userId, reactionEnum}) => {
        const oldNumberOfLikes = post.numberOfLikes;
        const oldNumberOfDislikes = post.numberOfDislikes;
        const usersReactionsArray = post.usersReactions;
        const userReaction = usersReactionsArray.find(userReaction => userReaction.userId === userId);
        if(reactionEnum === ReactionEnum.like){
            if(userReaction){
                if( userReaction.reactionEnum === ReactionEnum.dislike){//disliked
                    const updatedUserReaction : UserReaction = {...userReaction, reactionEnum: ReactionEnum.like  }
                    return adapter.updateOne({id: post.id, changes: { numberOfLikes: oldNumberOfLikes + 1,
                         numberOfDislikes: oldNumberOfDislikes - 1,
                          usersReactions: [...post.usersReactions.filter(reaction => reaction.userId !== userId), updatedUserReaction ]} }, state)
                }
                if(userReaction.reactionEnum === ReactionEnum.like ){//already liked && usersReactionsArray.includes({userId: userId, reaction: 1}
                    const updatedUserReaction : UserReaction = {...userReaction, reactionEnum: ReactionEnum.neutral }
                    return adapter.updateOne({id: post.id, changes:{numberOfLikes: oldNumberOfLikes - 1,
                         usersReactions: [...post.usersReactions.filter(reaction => reaction.userId !== userId), updatedUserReaction ] }}, state)
                }
            }
            const newUserReaction: UserReaction = {userId: userId, reactionEnum: ReactionEnum.like }
            return adapter.upsertOne({...post, numberOfLikes: oldNumberOfLikes + 1,
                usersReactions: [...post.usersReactions.filter(reaction => reaction.userId !== userId), newUserReaction ] }, state)
    
        }
        else {
            if(userReaction){
                if( userReaction.reactionEnum === ReactionEnum.like){//liked
                    const updatedUserReaction : UserReaction = {...userReaction, reactionEnum: ReactionEnum.dislike }
                    return adapter.updateOne({id: post.id, changes: { numberOfLikes: oldNumberOfLikes - 1,
                         numberOfDislikes: oldNumberOfDislikes + 1,
                          usersReactions: [...post.usersReactions.filter(reaction => reaction.userId !== userId), updatedUserReaction ]} }, state)
                }
                if(userReaction.reactionEnum === ReactionEnum.dislike){//already disliked 
                    const updatedUserReaction : UserReaction = {...userReaction, reactionEnum: ReactionEnum.neutral }
                    return adapter.updateOne({id: post.id, changes:{numberOfDislikes: oldNumberOfDislikes - 1,
                         usersReactions: [...post.usersReactions.filter(reaction => reaction.userId !== userId), updatedUserReaction ] }}, state)
                }
            }
            const newUserReaction: UserReaction = {userId: userId, reactionEnum: ReactionEnum.dislike }
            return adapter.upsertOne({...post, numberOfDislikes: oldNumberOfDislikes + 1,
                usersReactions: [...post.usersReactions.filter(reaction => reaction.userId !== userId), newUserReaction ] }, state)
    
        }
                // return {...state};
    }),
    on(Actions.reactToPostFailure, (state, {error}) => {
        return {...state, error: error}
    }),
    on(Actions.likePostFailure, (state, {error}) => {
        return {...state, error: error}
    }),
    // on(deleteUserCommentSuccess, (state, {userComment}) => {
    //     let post = state.entities[userComment.postId] ?? null
    //     if(!post)
    //         return state
    //     post.numberOfComments = post.numberOfComments - 1
    //     adapter.removeOne(userComment.postId, state)
    //     return adapter.addOne(post, state)
    // }),
    on(Actions.changeNumberOfCommentsOfPost, (state, {postId, amount}) => {
        const post = state.entities[postId] ?? null;
        console.log("Iz post reducera, pre uslova za post")
        if(!post)
            return {...state}
        console.log("post")
        console.log(post)
        console.log("Iz post reducera, pre uslova za komentari")
        if(post.numberOfComments < 0)
            return {...state}
        console.log("Iz psot reducera")
        
        const oldNumberOfComments = post.numberOfComments;
        console.log("number of commetns " + oldNumberOfComments )
        const newNumberOfComments = oldNumberOfComments + amount
        console.log("new number of commetns " + newNumberOfComments )
        if(oldNumberOfComments >= 0)
            return adapter.updateOne({id: postId, changes: {numberOfComments: newNumberOfComments}}, state);
        else {
            console.log("doslo do else")
            return {...state }
        }
    }),
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
