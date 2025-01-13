import { Controller, Get, HttpCode, Patch, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto, GetPaymentDto, UpdatePaymentStatusDto } from './dto';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @HttpCode(201)
  @Post('create')
  async createPayment(dto: CreatePaymentDto) {
    return this.paymentService.createPayment(dto);
  }

  @HttpCode(200)
  @Patch('update')
  async updatePayment(dto: UpdatePaymentStatusDto) {
    return this.paymentService.updatePayment(dto);
  }

  @HttpCode(200)
  @Get('get')
  async getPayment(dto: GetPaymentDto) {
    return this.paymentService.getPayment(dto);
  }
}
