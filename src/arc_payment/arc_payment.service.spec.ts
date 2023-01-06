import { Test, TestingModule } from '@nestjs/testing';
import { ArcPaymentService } from './arc_payment.service';

describe('ArcPaymentService', () => {
  let service: ArcPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArcPaymentService],
    }).compile();

    service = module.get<ArcPaymentService>(ArcPaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
