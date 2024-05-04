export interface Post {
    userId: number,
    userFullname: string,
    userImage: string,
    date: string,
    text?: string,
    image?: string,
    video?: string,
    numberOfLikes: number,
    numberOfDislikes: number,
    numberOfComments: number,
    numberOfShares: number
}

