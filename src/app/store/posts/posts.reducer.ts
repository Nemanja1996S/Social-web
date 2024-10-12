import { createReducer, on } from "@ngrx/store";
import { Post, ReactionEnum, UserReaction } from "../../../models/Post";
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
    // on(Actions.likePostSuccess, (state, {post, userId}) => {
    //     const oldNumberOfLikes = post.numberOfLikes;
    //     const oldNumberOfDislikes = post.numberOfDislikes;
    //     const usersReactionsArray = post.usersReactions;
    //     const userReaction = usersReactionsArray.find(userReaction => userReaction.reactedUserId === userId);
    //     if(userReaction){
    //         if( userReaction.reaction < 0){//disliked
    //             const updatedUserReaction = {...userReaction, reaction: 1 }
    //             return adapter.updateOne({id: post.id, changes: { numberOfLikes: oldNumberOfLikes + 1,
    //                  numberOfDislikes: oldNumberOfDislikes - 1,
    //                   usersReactions: [...post.usersReactions.filter(reaction => reaction.reactedUserId !== userId), updatedUserReaction ]} }, state)
    //         }
    //         if(userReaction.reaction > 0 ){//already liked && usersReactionsArray.includes({reactedUserId: userId, reaction: 1}
    //             const updatedUserReaction = {...userReaction, reaction: 0 }
    //             return adapter.updateOne({id: post.id, changes:{numberOfLikes: oldNumberOfLikes - 1,
    //                  usersReactions: [...post.usersReactions.filter(reaction => reaction.reactedUserId !== userId), updatedUserReaction ] }}, state)
    //         }
    //     }
    //     const newUserReaction: UserReaction = {reactedUserId: userId, reaction: 1 }
    //     return adapter.upsertOne({...post, numberOfLikes: oldNumberOfLikes + 1,
    //         usersReactions: [...post.usersReactions.filter(reaction => reaction.reactedUserId !== userId), newUserReaction ] }, state)
    //     // return {...state};
    // }),
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
    // on(Actions.dislikePost, (state, {post, userId}) => {
    //     const oldNumberOfLikes = post.numberOfLikes;
    //     const oldNumberOfDislikes = post.numberOfDislikes;
    //     const usersReactionsArray = post.usersReactions;
    //     const userReaction = usersReactionsArray.find(userReaction => userReaction.reactedUserId === userId);
    //     if(userReaction){
    //         if( userReaction.reaction > 0){//liked
    //             const updatedUserReaction = {...userReaction, reaction: -1 }
    //             return adapter.updateOne({id: post.id, changes: { numberOfLikes: oldNumberOfLikes - 1,
    //                  numberOfDislikes: oldNumberOfDislikes + 1,
    //                   usersReactions: [...post.usersReactions.filter(reaction => reaction.reactedUserId !== userId), updatedUserReaction ]} }, state)
    //         }
    //         if(userReaction.reaction < 0 ){//already disliked 
    //             const updatedUserReaction = {...userReaction, reaction: 0 }
    //             return adapter.updateOne({id: post.id, changes:{numberOfDislikes: oldNumberOfDislikes - 1,
    //                  usersReactions: [...post.usersReactions.filter(reaction => reaction.reactedUserId !== userId), updatedUserReaction ] }}, state)
    //         }
    //     }
    //     const newUserReaction: UserReaction = {reactedUserId: userId, reaction: -1 }
    //     return adapter.upsertOne({...post, numberOfDislikes: oldNumberOfDislikes + 1,
    //         usersReactions: [...post.usersReactions.filter(reaction => reaction.reactedUserId !== userId), newUserReaction ] }, state)
    //     // return {...state};
    // }),
    on(Actions.changeNumberOfCommentsOfPost, (state, {postId, amount}) => {
        const post = {...state.entities[postId]};
        const oldNumberOfComments = post.numberOfComments;
        if(oldNumberOfComments)
            return adapter.updateOne({id: postId, changes: {numberOfComments: oldNumberOfComments + amount}}, state);
        else return {...state }
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
