import { UserDto } from './user.dto';
import { DbAuditable } from '../shared/base/db-auditable.abstract';
import { UserRole } from '../shared/enums/UserRole';

export class User extends DbAuditable {
    email: string;
    passwordHash: string;
    role: UserRole;
    lastAccessIp: string;

    constructor(
        props: {
            id: string,
            email: string,
            passwordHash: string,
            role: UserRole,
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
