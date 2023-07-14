import { DbAuditable } from '../../common/db-auditable.abstract';
import { Column, Entity } from 'typeorm';
import { User } from '../users/user.model';

@Entity(({ name: 'api_session' }))
export class ApiSession extends DbAuditable {
    @Column()
    userId: string;
    @Column()
    token: string;
    @Column()
    ipAddress: string;
    @Column()
    startDt: Date;
    @Column()
    lastActivityDt: Date;
    @Column()
    active: boolean;

    user: User;

    constructor(
        props: {
            id: string,
            userId: string,
            token: string,
            ipAddress: string,
            lastActivityDt?: Date,
            currentUserId?: string,
        },
    ) {
        const currentDate = new Date();
        super({
            id: props.id,
            currentUserId: props.currentUserId,
        });
        this.userId = props.userId;
        this.token = props.token;
        this.ipAddress = props.ipAddress;
        this.startDt = currentDate;
        this.lastActivityDt = props.lastActivityDt ?? currentDate;
        this.active = true;
    }

    update(
        props: {
            ipAddress: string,
            lastActivityDt?: Date,
            currentUserId?: string,
            active?: boolean,
        },
    ) {
        const currentDate = new Date();
        super.updateDbAuditable({
            currentUserId: props.currentUserId,
        });
        this.ipAddress = props.ipAddress;
        this.lastActivityDt = props.lastActivityDt ?? currentDate;
        this.updatedDt = currentDate;
        this.updatedBy = props.currentUserId;
        if (!!props.active) {
            this.active = props.active;
        }
    }
}
