// export interface UserFriends{
//     id: number,
//     friends: Friend[]
//     userFriendsIds: number[]
// }

// export interface Friend
// {
//     id: number,
//     userId: number,
//     userFullname: string,   ///nije full mame
//     userImage: string,
//     selectedSports: string[],
//     friendsIds: number[]
// }

export interface Friend{
    id: number,
    name: string,
    surname: string,
    picture: string,
    selectedSports: string[],
    friends: friendId[]
}

export interface friendId{
    friendId : number
}

// {
//     "id": 2,
//     "name": "Marko",
//     "surname": "Stoiljkovic",
//     "picture": "https://scontent.fbeg10-1.fna.fbcdn.net/v/t39.30808-1/376655995_6714521235279645_6116058130008955357_n.jpg?stp=cp0_dst-jpg_s80x80&_nc_cat=100&ccb=1-7&_nc_sid=4f5e1a&_nc_ohc=-Ft0o9YZIfQQ7kNvgHgsoyo&_nc_ht=scontent.fbeg10-1.fna&_nc_gid=AzEnuPxBJu6kr8Kqua_gbWq&oh=00_AYA5a2FuCgU6NZGeyRTaQZ5l9ncLnxkJs42iZgUj9M1MZA&oe=67008AC0",
//     "selectedSports": [
//         "Tennis",
//         "Basketball"
//     ],
//     "friends": [
//         {
//             "friendId": 1
//         }
//     ]
// }