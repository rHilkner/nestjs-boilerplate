import { UserDto } from './user.dto';

export enum Role {
    CUSTOMER = 'CUSTOMER',
    ADMIN = 'ADMIN',
}

export class User {
    id: number;
    email: string;
    password: string;
    role: Role;
    createdDt: Date;
    createdBy: string;
    updatedDt: Date;
    updatedBy: string;

    constructor(
        props: {
            id: number,
            email: string,
            password: string,
            role: Role,
            createdDt: Date,
            createdBy: string,
            updatedDt: Date,
            updatedBy: string,
        },
    ) {
        this.id = props.id;
        this.email = props.email;
        this.password = props.password;
        this.role = props.role;
        this.createdDt = props.createdDt;
        this.createdBy = props.createdBy;
        this.updatedDt = props.updatedDt;
        this.updatedBy = props.updatedBy;
    }

    toDto(): UserDto {
        return UserDto.fromModel(this);
    }
}
