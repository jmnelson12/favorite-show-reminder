export interface IUser {
    _id?: string;
    email: string;
    password: string;
    salt: string;
    loggedIn: boolean;
    token?: string;
};

export interface IUserInputDTO {
    email: string;
    password: string;
};