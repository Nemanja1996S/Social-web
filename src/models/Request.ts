export interface FriendRequest {
    toUserId: number,
    fromUserId: number,
    fromUserFullName: string,
    fromUserImg: string,
    fromUserFriendsIds: number[],
    fromUserSelectedSports: string[]
}