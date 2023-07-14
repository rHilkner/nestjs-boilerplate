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
            currentUserId: string,
        },
    ) {
        const currentDate = new Date();
        super({
            id: props.id,
            createdDt: currentDate,
            createdBy: props.currentUserId,
            updatedDt: currentDate,
            updatedBy: props.currentUserId,
        });
        this.email = props.email;
        this.passwordHash = props.passwordHash;
        this.role = props.role;
    }

    update(
        props: {
            email: string,
            passwordHash: string,
            role: UserRole,
            currentUserId: string,
        }
    ) {
        super.updateDbAuditable({
            updatedDt: new Date(),
            updatedBy: props.currentUserId,
        })
        this.email = props.email;
        this.passwordHash = props.passwordHash;
        this.role = props.role;
    }

    toDto(): UserDto {
        return UserDto.fromModel(this);
    }
}
