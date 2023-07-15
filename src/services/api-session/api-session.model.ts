import { DbAuditable } from '../../common/db-auditable.abstract';
import { Column, Entity } from 'typeorm';
import { User } from '../users/user.model';

@Entity(({ name: 'api_session' }))
export class ApiSession extends DbAuditable {
    @Column()
    userId: string;
    @Column()
    accessToken: string;
    @Column()
    refreshToken: string;
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
            userId: string,
            accessToken: string,
            refreshToken: string,
            ipAddress: string,
            lastActivityDt?: Date,
            currentUserId?: string,
        },
    ) {
        super({ currentUserId: props.currentUserId });
        const currentDate = new Date();
        this.userId = props.userId;
        this.accessToken = props.accessToken;
        this.refreshToken = props.refreshToken;
        this.ipAddress = props.ipAddress;
        this.startDt = currentDate;
        this.lastActivityDt = props.lastActivityDt ?? currentDate;
        this.active = true;
    }

    update(
        props: {
            ipAddress?: string,
            lastActivityDt?: Date,
            currentUserId?: string,
            active?: boolean,
            refreshToken?: string,
        },
    ) {
        super.updateDbAuditable({ currentUserId: props.currentUserId });
        const currentDate = new Date();
        this.lastActivityDt = props.lastActivityDt ?? currentDate;
        if (!!props.ipAddress) {
            this.ipAddress = props.ipAddress;
        }
        if (!!props.refreshToken) {
            this.refreshToken = props.refreshToken;
        }
        if (!!props.active) {
            this.active = props.active;
        }
    }
}
