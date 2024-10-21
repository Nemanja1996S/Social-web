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

export interface Friendship{
    id: number
    friend: MiniFriend2
}

export interface MiniFriend{
    friendId: number
}

export interface MiniFriend2{
    id: number
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
    friendships: Friendship[],
    requests: MiniRequest[];
    selectedSports: string[],
    dateOfBirth: string,
    education: string,
    work: string,
    aboutMe: string
}

export interface UpdateUserDto {
    id: number 
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    picture?: string
    selectedSports?: string[]
    dateOfBirth?: string
    education?: string
    work?: string
    aboutMe?: string
}