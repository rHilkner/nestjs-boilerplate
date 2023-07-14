import { UserDto } from './user.dto';
import { DbAuditable } from '../../common/db-auditable.abstract';
import { UserRole } from '../../common/enums/UserRole';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'app_user' })
export class User extends DbAuditable {
    @Column()
    email: string;
    @Column()
    passwordHash: string;
    @Column()
    role: UserRole;
    @Column()
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
