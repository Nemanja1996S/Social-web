import { Dictionary, EntityState } from "@ngrx/entity";


export interface UserReactionsToPosts{
    usersReactionToPosts: Dictionary<Dictionary<Reaction>>
}
export enum Reaction {        
    "dislike" = -1,
    "neutral" = 0,
    "like" = 1
}