export interface Comments{
    id: number
    postId: number,
    userComments: UserComment[]
}

export interface UserComment{
    userId: number,
    userFullName: string,
    userPicSrc: string,
    commentDate: string,
    commentText: string,
    commentPic: string
}