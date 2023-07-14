import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiSession } from './api-session.model';
import { ApiSessionService } from './api-session.service';

@Module({
    imports: [TypeOrmModule.forFeature([ApiSession])],
    providers: [ApiSessionService],
    exports: [ApiSessionService],
})
export class ApiSessionModule {}
