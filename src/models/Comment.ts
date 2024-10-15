export interface Comments{
    id: number
    postId: number,
    userComments: UserComment[]
}

export interface UserComment{
    id: number,
    postId: number,
    userId: number,
    userName: string,
    userSurname: string
    userPicSrc: string,
    commentDate: string,
    commentText?: string,
    commentPic?: string
}

export interface CommentEntityFromDatabase{
    id: number
    user: PartOfUserComment,
    post: number,
    commentDate: string,
    commentText?: string,
    commentPic?: string
}

interface PartOfUserComment{
    id: number,
    name: string,
    surname: string,
    picture: string
}

interface PartOfPostComment{
    post: number
}

// export interface Comments{
//     id: number
//     postId: number,
//     userComments: UserComment[]
// }

// export interface UserComment{
//     userId: number,
//     userFullName: string,
//     userPicSrc: string,
//     commentDate: string,
//     commentText: string,
//     commentPic: string
// }

export interface CreateUserComment{
    userId: number,
    commentText?: string,
    commentPic?: string
}