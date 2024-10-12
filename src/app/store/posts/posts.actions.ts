import { createAction, props } from "@ngrx/store";
import { createPost, Post, ReactionEnum } from "../../../models/Post"


export const loadPosts = createAction(
    "Loading posts to state",
    props<{
        userId: number
    }>()
);

export const loadPostsSuccess = createAction(
    "Loading post to state success",
    props<{
        posts: Post[]
    }>()
);

export const loadPostsFailure = createAction(
    "Loading post to state failure",
    props<{
        error: string
    }>()
);

export const deletePost = createAction(
    "Deleting post from database",
    props<{
        postId: number
    }>()
);

export const deletePostSuccess = createAction(
    "Deleting post from database success",
    props<{
        postId: number
    }>()
);

export const deletePostFailure = createAction(
    "Deleting post from database failure",
    props<{
        error: string
    }>()
);

export const addPost = createAction(
    "Add post",
    props<{
        userId: number,
        createPostObject: createPost
    }>()
)

export const addPostsFailure = createAction(
    "Adding post to database failure",
    props<{
        error: string
    }>()
);



export const editPost = createAction(
    "Editing post from database",
    props<{
        postId: number
        postText?: string
        postImage?: string
    }>()
);

export const editPostSuccess = createAction(
    "Edit post success",
    props<{
        postId: number
        postText?: string
        postImage?: string
    }>()
);

export const editPostFailure = createAction(
    "Edit post failure",
    props<{
        error: string
    }>()
);

export const loadPostsForSports = createAction(
    "Loading posts to state for selected sports",
    props<{
        userId: number,
        selectedSports: string[]
    }>()
);

export const loadPostsForSportsSuccess = createAction(
    "Loading post to state for selected sports success",
    props<{
        posts: Post[]
    }>()
);

export const loadPostsForSportsFailure = createAction(
    "Loading post to state for selected sports failure",
    props<{
        error: string
    }>()
);

export const likePost = createAction(
    "Liking post",
    props<{
        post: Post,
        userId: number,
        reactionEnum?: ReactionEnum.like
    }>()
)

export const likePostSuccess = createAction(
    "Liking post success",
    props<{
        post: Post,
        userId: number
    }>()
)

export const likePostFailure = createAction(
    "Liking post failure",
    props<{
        error: string
    }>()
)

export const reactToPost = createAction(
    "Reacting to post",
    props<{
        post: Post,
        userId: number,
        reactionEnum: ReactionEnum
    }>()
)

export const reactToPostSuccess = createAction(
    "React to post success",
    props<{
        post: Post,
        userId: number,
        reactionEnum: ReactionEnum
    }>()
)

export const reactToPostFailure = createAction(
    "React post failure",
    props<{
        error: string
    }>()
)

export const dislikePost = createAction(
    "Disliking post",
    props<{
        post: Post,
        userId: number,
        reactionEnum?: ReactionEnum.dislike
    }>()
)

export const changeNumberOfCommentsOfPost = createAction(
    "Changing number of comments of post",
    props<{
        postId: number,
        amount: number
    }>()
)


