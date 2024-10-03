import { Dictionary, EntityState } from "@ngrx/entity";


// export interface UserReactionsToPosts{
//     // userId: number
//     postReactions: Reaction[]
// }

export interface Reaction{
    postId: number
    reaction: ReactionEnum
}

export enum ReactionEnum {        
    "dislike" = -1,
    "neutral" = 0,
    "like" = 1
}