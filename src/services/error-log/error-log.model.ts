import { DbAuditable } from '../../common/db-auditable.abstract';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'error_log' })
export class ErrorLog extends DbAuditable {
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
        super({
            id: props.id,
            createdBy: props.currentUserId,
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
