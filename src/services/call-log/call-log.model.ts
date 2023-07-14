import { DbAuditable } from '../../common/db-auditable.abstract';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'call_log' })
export class CallLog extends DbAuditable {
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
            currentUserId: string,
        },
    ) {
        const currentDate = new Date();
        super({
            id: props.id,
            currentUserId: props.currentUserId,
        });
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
        this.startDt = props.startDt ?? currentDate;
        this.endDt = props.endDt;
    }

    update(
        props: {
            httpStatus?: number,
            responseBody?: string,
            responseHeaders?: string,
            endDt?: Date,
            currentUserId: string,
        },
    ) {
        super.updateDbAuditable({
            currentUserId: props.currentUserId,
        });
        this.httpStatus = props.httpStatus;
        this.responseBody = props.responseBody;
        this.responseHeaders = props.responseHeaders;
        this.endDt = props.endDt;
    }
}
