export interface Comment{
    postId: number,
    usersComments: UserComment[]
}

export interface UserComment{
    userId: number,
    userFullName: string,
    userPicSrc: string,
    commentDate: string,
    commentText: string
}