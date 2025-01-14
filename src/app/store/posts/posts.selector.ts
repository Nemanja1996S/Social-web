import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Post } from "../../../models/Post";
import { Dictionary } from "@ngrx/entity";
import { searchSelectedSportsSelector, userIdSelector } from "../user/user.selector";
import { profileIdSelector } from "../profile/profile.selectors";

export const selectPostsFeature = (state: AppState) => state.postsState;	

export const postsSelector = createSelector(
    selectPostsFeature,
    searchSelectedSportsSelector,
    (state, selectedSports) => Object
    .values(state.entities).filter(post => selectedSports.length > 0 ? post != null && isForSports(post, selectedSports): post != null)
    .map(post => <Post>post).sort((a, b) => b.date.localeCompare(a.date))
)

function isForSports(post: Post, selectedSports: string[]): boolean {
    return post.forSports.some(sport => selectedSports.includes(sport));
}

// export const userReactionForPostsSelector = createSelector(
//     selectPostsFeature,
//     userIdSelector,
//     (state, userId) => Object.values(state.entities).map(post => <Post>post).map(post => post.usersReactions)
//     .map(reactions => reactions.filter(reaction => reaction.reactedUserId === userId))
// )


// export const postIdSelector = createSelector(
//     (user) => user.id
// )

export const loggedInUserPostsSelector = createSelector(
    selectPostsFeature,
    userIdSelector,
    (state, userId) => Object
    .values(state.entities).map(post => <Post>post).filter(post => post.user.id === userId)
    .sort((a, b) => b.date.localeCompare(a.date))
)

export const profilePostsSelector = createSelector(
    selectPostsFeature,
    profileIdSelector,
    (state, profileId) => Object
    .values(state.entities).map(post => <Post>post).filter(post => post.user.id === profileId)
    .sort((a, b) => b.date.localeCompare(a.date))
)


// export const userReactionSelector = createSelector(
//     postsSelector,
//     userIdSelector,
//     (posts, userId) => posts.map(post => post.usersReactions.map(reaction => reaction.reactedUserId === userId ? reaction : null))
// )


// export const postsSelector = createSelector(
//     selectPostsFeature,
//     (state) => Object
//     .values(state.entities).filter(post => post != null)
//     .map(post => <Post>post).sort((a, b) => b.date.localeCompare(a.date))
// )
// export const postsForSportsSelector(selectedSports: string[]) = createSelector(
//     selectPostsFeature,
//     (state) => Object
//     .values(state.entities).filter(post => post != null)
//     .map(post => <Post>post).sort((a, b) => b.date.localeCompare(a.date))
// )


// export const userReactonToPostDictSelector = createSelector(
//     selectPostsFeature,
//     (postState) => Object.values(postState.entities).filter(post => post != null).map(post => post?.usersReactionToPostDict)
// )

export const errorSelector = createSelector(
    selectPostsFeature,
    (state) => state.error
)