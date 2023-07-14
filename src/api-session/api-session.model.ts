import { DbAuditable } from '../shared/base/db-auditable.abstract';
import { Column, Entity } from 'typeorm';

@Entity()
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
            createdDt?: Date,
            createdBy?: string,
            updatedDt?: Date,
            updatedBy?: string,
        },
    ) {
        const currentDate = new Date();
        super({ ...props });
        this.userId = props.userId;
        this.token = props.token;
        this.ipAddress = props.ipAddress;
        this.startDt = currentDate;
        this.lastActivityDt = props.lastActivityDt ?? currentDate;
    }
}
