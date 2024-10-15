import { MiniFriend } from "./User"

export interface FriendRequest {
    id: number,
    toUserId: number,   //
    fromUserId: number, //
    fromUserFullName: string, //
    fromUserImg: string,    //
    fromUserFriendsIds: number[],   //
    fromUserSelectedSports: string[]   //
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
    friends: MiniFriend[]
}
