import {
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto, GetPaymentDto, UpdatePaymentStatusDto } from './dto';

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @HttpCode(201)
  @Post('')
  async createPayment(dto: CreatePaymentDto) {
    return this.paymentService.createPayment(dto);
  }

  @HttpCode(200)
  @Get('order/:orderId')
  async getPaymentByOrderId(@Param() orderId: number) {
    return this.paymentService.getPaymentByOrderId(orderId);
  }

  @HttpCode(200)
  @Get('get')
  async getPayment(dto: GetPaymentDto) {
    return this.paymentService.getPayment(dto);
  }

  @HttpCode(200)
  @Put('update')
  async updatePayment(dto: UpdatePaymentStatusDto) {
    return this.paymentService.updatePayment(dto);
  }

  @HttpCode(200)
  @Get('get')
  async getPayments() {
    return this.paymentService.getPayments();
  }
}
