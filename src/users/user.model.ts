import { UserDto } from './user.dto';
import { DbAuditable } from '../shared/base/db-auditable.abstract';

export enum Role {
    CUSTOMER = 'CUSTOMER',
    ADMIN = 'ADMIN',
}

export class User extends DbAuditable {
    email: string;
    passwordHash: string;
    role: Role;
    lastAccessIp: string;

    constructor(
        props: {
            id: string,
            email: string,
            passwordHash: string,
            role: Role,
            createdDt: Date,
            createdBy: string,
            updatedDt: Date,
            updatedBy: string,
        },
    ) {
        super({ ...props });
        this.email = props.email;
        this.passwordHash = props.passwordHash;
        this.role = props.role;
    }

    toDto(): UserDto {
        return UserDto.fromModel(this);
    }
}
