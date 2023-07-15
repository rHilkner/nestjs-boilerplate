import { DbAuditable } from '../../common/db-auditable.abstract';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'error_log' })
export class ErrorLog extends DbAuditable {
    @Column()
    userId: string;
    @Column()
    callLogId: string;
    @Column()
    httpStatus: number;
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
            userId: string,
            callLogId: string,
            httpStatus: number,
            exceptionClass: string,
            stackTrace: string,
            errorMessage: string,
            debugMessage: string,
            timestamp: Date,
            currentUserId: string,
        },
    ) {
        super({
            currentUserId: props.currentUserId,
        });
        this.userId = props.userId;
        this.callLogId = props.callLogId;
        this.httpStatus = props.httpStatus;
        this.exceptionClass = props.exceptionClass;
        this.stackTrace = props.stackTrace;
        this.errorMessage = props.errorMessage;
        this.debugMessage = props.debugMessage;
        this.exceptionTimestamp = props.timestamp;
    }
}
