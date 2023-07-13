import { Test, TestingModule } from '@nestjs/testing';
import { SysCallLogService } from './sys-call-log.service';

describe('SysCallLogService', () => {
  let service: SysCallLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SysCallLogService],
    }).compile();

    service = module.get<SysCallLogService>(SysCallLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
