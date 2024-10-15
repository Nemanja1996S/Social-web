export interface User {
    id: number,
    name: string,
    surname: string,
    email: string,
    password: string,
    picture: string,
    friendsIds: number[],
    requests: MiniRequest[];
    selectedSports: string[],
    dateOfBirth: string,
    education: string,
    work: string,
    aboutMe: string
}

export interface MiniFriend{
    friendId: number
}

export interface MiniRequest{
    id: number,
    fromUserId: number
}

export interface UserFromDatabase {
    id: number,
    name: string,
    surname: string,
    email: string,
    password: string,
    picture: string,
    friends: MiniFriend[],
    requests: MiniRequest[];
    selectedSports: string[],
    dateOfBirth: string,
    education: string,
    work: string,
    aboutMe: string
}
