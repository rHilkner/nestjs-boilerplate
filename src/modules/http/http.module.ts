import { Module } from '@nestjs/common';
import { HttpService } from './http.service';
import { CallLogModule } from '../call-log/call-log.module';

@Module({
    imports: [CallLogModule],
    providers: [HttpService],
    exports: [HttpService],
})
export class HttpModule {}
