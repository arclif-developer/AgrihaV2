import { Test, TestingModule } from '@nestjs/testing';
import { UserPaymentController } from './user_payment.controller';
import { UserPaymentService } from './user_payment.service';

describe('UserPaymentController', () => {
  let controller: UserPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPaymentController],
      providers: [UserPaymentService],
    }).compile();

    controller = module.get<UserPaymentController>(UserPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
