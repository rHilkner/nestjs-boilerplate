import { Test, TestingModule } from '@nestjs/testing';
import { SysErrorLogService } from './sys-error-log.service';

describe('ApiSessionService', () => {
  let service: SysErrorLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SysErrorLogService],
    }).compile();

    service = module.get<SysErrorLogService>(SysErrorLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
