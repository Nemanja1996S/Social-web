export interface UserFriends{
    id: number,
    friends: Friend[]
}

export interface Friend
{
    id: number,
    userId: number,
    userFullname: string,
    userImage: string,
    selectedSports: string[],
    friendsIds: number[]
}