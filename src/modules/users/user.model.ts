import { UserDto } from './dtos/user.dto';
import { DbAuditable } from '../../common/models/db-auditable-abstract.model';
import { UserRole } from '../../../shared/enums';
import { Column, Entity } from 'typeorm';
import { UserDtoSchema } from '../../../shared/dtos'

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
        super({ currentUserId: props.currentUserId });
        this.email = props.email;
        this.passwordHash = props.passwordHash;
        this.role = props.role;
    }

    update(
        props: {
            email: string,
            role: UserRole,
            currentUserId?: string,
        }
    ) {
        super.updateDbAuditable({ currentUserId: props.currentUserId })
        this.email = props.email;
        this.role = props.role;
    }

    toDto(): UserDto {
      //TODO
      return UserDtoSchema.parse({
          id: this.id,
          email: this.email,
          role: this.role,
          createdDate: this.createdDt,
          createdBy: this.createdBy,
          updatedDate: this.updatedDt,
          updatedBy: this.updatedBy,
      });
    }
}
