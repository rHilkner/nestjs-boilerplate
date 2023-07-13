import { DbAuditable } from '../shared/base/db-auditable.abstract';
import { Column, Entity } from 'typeorm';

@Entity()
export class ApiSession extends DbAuditable {
    @Column()
    userId: string;
    @Column()
    role: string;
    @Column()
    permissions: string;
    @Column()
    token: string;
    @Column()
    ipAddress: string;
    @Column()
    statusActive: string;
    @Column()
    startDt: Date;
    @Column()
    lastActivityDt: Date;
    @Column()
    expirationDt: Date;
    @Column()
    renewExpiration: boolean;

    constructor(
        props: {
            id: string,
            userId: string,
            role: string,
            permissions: string,
            token: string,
            ipAddress: string,
            statusActive: string,
            startDt: Date,
            lastActivityDt: Date,
            expirationDt: Date,
            renewExpiration: boolean
            createdDt: Date,
            createdBy: string,
            updatedDt: Date,
            updatedBy: string,
        },
    ) {
        super({ ...props });
        this.userId = props.userId;
        this.role = props.role;
        this.permissions = props.permissions;
        this.token = props.token;
        this.ipAddress = props.ipAddress;
        this.statusActive = props.statusActive;
        this.startDt = props.startDt;
        this.lastActivityDt = props.lastActivityDt;
        this.expirationDt = props.expirationDt;
        this.renewExpiration = props.renewExpiration;
    }
}
