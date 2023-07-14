import { DbAuditable } from '../shared/base/db-auditable.abstract';
import { Column, Entity } from 'typeorm';

@Entity()
export class SysCallLog extends DbAuditable {
    @Column()
    transactionId: string;
    @Column()
    userId: string;
    @Column()
    sessionId: string;
    @Column()
    url: string;
    @Column()
    ip: string;
    @Column()
    method: string;
    @Column()
    endpoint: string;
    @Column()
    parameters: string;
    @Column()
    requestBody: string;
    @Column()
    requestHeaders: string;
    @Column()
    httpStatus?: number;
    @Column()
    responseBody?: string;
    @Column()
    responseHeaders?: string;
    @Column()
    startDt: Date;
    @Column()
    endDt?: Date;

    constructor(
        props: {
            id: string,
            transactionId: string,
            userId: string,
            sessionId: string,
            url: string,
            ip: string,
            method: string,
            endpoint: string,
            parameters: string,
            requestBody: string,
            requestHeaders: string,
            httpStatus?: number,
            responseBody?: string,
            responseHeaders?: string,
            startDt?: Date,
            endDt?: Date,
            createdDt?: Date,
            createdBy?: string,
            updatedDt?: Date,
            updatedBy?: string,
        },
    ) {
        super({ ...props });
        this.transactionId = props.transactionId;
        this.userId = props.userId;
        this.sessionId = props.sessionId;
        this.url = props.url;
        this.ip = props.ip;
        this.method = props.method;
        this.endpoint = props.endpoint;
        this.parameters = props.parameters;
        this.requestBody = props.requestBody;
        this.requestHeaders = props.requestHeaders;
        this.httpStatus = props.httpStatus;
        this.responseBody = props.responseBody;
        this.responseHeaders = props.responseHeaders;
        this.startDt = props.startDt ?? new Date();
        this.endDt = props.endDt;
    }
}
