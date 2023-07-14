import { Test, TestingModule } from '@nestjs/testing';
import { ApiSessionService } from './api-session.service';

describe('ApiSessionService', () => {
  let service: ApiSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiSessionService],
    }).compile();

    service = module.get<ApiSessionService>(ApiSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
