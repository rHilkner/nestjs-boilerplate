import { UserDto } from './dto/user.dto';
import { DbAuditable } from '../../common/db-auditable.abstract';
import { UserRole } from '../../common/enums/user-role';
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
            email: string,
            passwordHash: string,
            role: UserRole,
            currentUserId: string,
        },
    ) {
        super({
            currentUserId: props.currentUserId,
        });
        this.email = props.email;
        this.passwordHash = props.passwordHash;
        this.role = props.role;
    }

    update(
        props: {
            email: string,
            role: UserRole,
            currentUserId: string,
        }
    ) {
        super.updateDbAuditable({
            currentUserId: props.currentUserId,
        })
        this.email = props.email;
        this.role = props.role;
    }

    toDto(): UserDto {
        return UserDto.fromModel(this);
    }
}
