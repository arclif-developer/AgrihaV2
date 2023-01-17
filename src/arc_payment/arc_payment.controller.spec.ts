import { Test, TestingModule } from '@nestjs/testing';
import { ArcPaymentController } from './arc_payment.controller';
import { ArcPaymentService } from './arc_payment.service';

describe('ArcPaymentController', () => {
  let controller: ArcPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArcPaymentController],
      providers: [ArcPaymentService],
    }).compile();

    controller = module.get<ArcPaymentController>(ArcPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
