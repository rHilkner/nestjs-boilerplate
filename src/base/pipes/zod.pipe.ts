import { ArgumentMetadata, HttpStatus, PipeTransform } from '@nestjs/common'
import { ZodSchema } from 'zod'
import { ApiException } from '../../common/exceptions/api-exception'

export class ZodPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: unknown, _: ArgumentMetadata): unknown {
    try {
      return this.schema.parse(value);
    } catch (error: unknown) {
      const ex = ApiException.fromAnyException(error);
      ex.httpStatus = HttpStatus.BAD_REQUEST;
      ex.errorCode = HttpStatus.BAD_REQUEST.toString();
      ex.appErrorMessage = 'Bad Request';
    }
  }
}
