import { Test, TestingModule } from '@nestjs/testing';
import { CallLogService } from './call-log.service';

describe('CallLogService', () => {
  let service: CallLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CallLogService],
    }).compile();

    service = module.get<CallLogService>(CallLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
