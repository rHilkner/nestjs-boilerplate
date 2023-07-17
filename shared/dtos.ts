export interface ICreateUserDto {
    email: string;
    password: string;
    role: string;
}

export interface IUpdateUserDto {
    id: string;
    email: string;
    role: string;
}

export interface ILoginDto {
    email: string;
    password: string;
}

export interface ISignUpDto {
    email: string;
    password: string;
}

export interface IUserDto {
    id: string;
    email: string;
    role: string;
}
