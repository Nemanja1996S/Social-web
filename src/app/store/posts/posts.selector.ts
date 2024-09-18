import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Post } from "../../../models/Post";
import { Dictionary } from "@ngrx/entity";

export const selectPostsFeature = (state: AppState) => state.postsState;	

export const postsSelector = createSelector(
    selectPostsFeature,
    (state) => Object
    .values(state.entities).filter(post => post != null)
    .map(post => <Post>post).sort((a, b) => b.date.localeCompare(a.date))
)


// export const userReactonToPostDictSelector = createSelector(
//     selectPostsFeature,
//     (postState) => Object.values(postState.entities).filter(post => post != null).map(post => post?.usersReactionToPostDict)
// )

export const errorSelector = createSelector(
    selectPostsFeature,
    (state) => state.error
)