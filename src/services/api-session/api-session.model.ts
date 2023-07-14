import { DbAuditable } from '../../common/db-auditable.abstract';
import { Column, Entity } from 'typeorm';

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
            createdDt: currentDate,
            createdBy: props.currentUserId,
            updatedDt: currentDate,
            updatedBy: props.currentUserId,
        });
        this.userId = props.userId;
        this.token = props.token;
        this.ipAddress = props.ipAddress;
        this.startDt = currentDate;
        this.lastActivityDt = props.lastActivityDt ?? currentDate;
    }

    update(
        props: {
            ipAddress: string,
            lastActivityDt?: Date,
            currentUserId?: string,
        },
    ) {
        const currentDate = new Date();
        super.updateDbAuditable({
            updatedDt: currentDate,
            updatedBy: props.currentUserId,
        });
        this.ipAddress = props.ipAddress;
        this.lastActivityDt = props.lastActivityDt ?? currentDate;
        this.updatedDt = currentDate;
        this.updatedBy = props.currentUserId;
    }
}
