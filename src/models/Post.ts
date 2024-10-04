import { Dictionary } from "@ngrx/entity"

// export enum Reaction {
//     "dislike" = -1,
//     "neutral" = 0,
//     "like" = 1
// }
export interface UserReaction{
    reactedUserId: number,
    reaction: number
    // reactions: ReactionEnum[]
}

export interface Post {
    id: number,
    userId: number,
    userFullname: string,
    userImage: string,
    forSports: string[],
    date: string,
    text?: string,
    image?: string,
    // video?: string,
    numberOfLikes: number,
    // userLiked: boolean,
    // userDislike: boolean,
    usersReactions : UserReaction[]
    // idsOfLikes: number[],
    // idsofDislikes: Number[],
    numberOfDislikes: number,
    numberOfComments: number,
    // numberOfShares: number
}

export const initialPost: Post = {
    id: -1,
    userId: -1,
    userFullname: '',
    userImage: '',
    forSports: [],
    date: '',
    text: '',
    image: '',
    usersReactions: [],
    numberOfLikes: -1,
    numberOfDislikes: -1,
    numberOfComments: -1,
    // numberOfShares: -1
}

