import { Dictionary } from "@ngrx/entity"

// export enum Reaction {
//     "dislike" = -1,
//     "neutral" = 0,
//     "like" = 1
// }

export enum ReactionEnum {        
    "dislike" = -1,
    "neutral" = 0,
    "like" = 1
}

export interface createPost {
    forSports: string[]
    text?: string
    image?: string
}
export interface UserReaction {
    userId: number,
    reactionEnum: ReactionEnum
    // reactions: ReactionEnum[]
}

export interface Post {
    id: number
    user: MiniUser,
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

export interface MiniUser{
    id: number,
    name: string,
    surname: string,
    picture: string
}

export const initialMiniuser: MiniUser = {
    id: -1,
    name: "",
    surname: "",
    picture: ""
} 

export const initialPost: Post = {
    id: -1,
    user: initialMiniuser,
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

