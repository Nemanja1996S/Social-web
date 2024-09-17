import { Dictionary } from "@ngrx/entity"

export enum Reaction {
    "dislike" = -1,
    "neutral" = 0,
    "like" = 1
}

export interface Post {
    id: number,
    userId: number,
    userFullname: string,
    userImage: string,
    date: string,
    text?: string,
    image?: string,
    video?: string,
    numberOfLikes: number,
    // userLiked: boolean,
    // userDislike: boolean,
    usersReactionToPostDict : Dictionary<Reaction>,
    // idsOfLikes: number[],
    // idsofDislikes: Number[],
    numberOfDislikes: number,
    numberOfComments: number,
    numberOfShares: number
}

