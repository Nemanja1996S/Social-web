import { Friendship, MiniFriend } from "./User"

export interface FriendRequest {
    id: number,
    toUserId: number,   //
    fromUserId: number, //
    fromUserFullName: string, //
    fromUserImg: string,    //
    fromUserFriendsIds: number[],   //
    fromUserSelectedSports: string[]   //
}

export interface MiniFriendRequest{
    id: number,
    toUser: miniUser,
    fromUser: miniUser
}
export interface miniUser{
    id: number
}

export interface FriendRequestFromDatabase {
    id: number,
    fromUser: MiniUserForRequests
}

export interface MiniUserForRequests{
    id: number,
    name: string,
    surname: string,
    picture: string,
    selectedSports: string[],
    friendships: Friendship[]
}
