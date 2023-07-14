import { DbAuditable } from '../shared/base/db-auditable.abstract';
import { Column, Entity } from 'typeorm';

@Entity()
export class SysErrorLog extends DbAuditable {
    @Column()
    userId: string;
    @Column()
    callLogId: string;
    @Column()
    httpStatus: string;
    @Column()
    httpStatusCode: string;
    @Column()
    exceptionClass: string;
    @Column()
    stackTrace: string;
    @Column()
    errorMessage: string;
    @Column()
    debugMessage: string;
    @Column()
    exceptionTimestamp: Date;

    constructor(
        props: {
            id: string,
            userId: string,
            callLogId: string,
            httpStatus: string,
            httpStatusCode: string,
            exceptionClass: string,
            stackTrace: string,
            errorMessage: string,
            debugMessage: string,
            exceptionTimestamp: Date,
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
        this.userId = props.userId;
        this.callLogId = props.callLogId;
        this.httpStatus = props.httpStatus;
        this.httpStatusCode = props.httpStatusCode;
        this.exceptionClass = props.exceptionClass;
        this.stackTrace = props.stackTrace;
        this.errorMessage = props.errorMessage;
        this.debugMessage = props.debugMessage;
        this.exceptionTimestamp = props.exceptionTimestamp;
    }
}
