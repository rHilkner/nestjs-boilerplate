import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiException extends HttpException {
    errorCode: string;
    httpStatus: HttpStatus;
    appErrorMessage: string;
    errorMessage: string;
    debugMessage: string;
    timestamp: Date;

    constructor(props: {
        errorCode: string,
        httpStatus: HttpStatus,
        appErrorMessage: string,
        errorMessage: string,
        debugMessage: string,
    }) {
        super({
            errorCode: props.errorCode,
            httpStatus: props.httpStatus.valueOf(),
            errorMessage: props.errorMessage,
            appErrorMessage: props.appErrorMessage,
        }, props.httpStatus);
        this.errorCode = props.errorCode;
        this.httpStatus = props.httpStatus;
        this.appErrorMessage = props.appErrorMessage;
        this.errorMessage = props.errorMessage;
        this.debugMessage = props.debugMessage;
        this.timestamp = new Date();
    }
}
