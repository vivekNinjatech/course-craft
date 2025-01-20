import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto, GetPaymentDto, UpdatePaymentStatusDto } from './dto';
import { GetOrderByIdDto } from 'src/order/dto';

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @HttpCode(201)
  @Post('')
  async createPayment(@Body() dto: CreatePaymentDto) {
    return this.paymentService.createPayment(dto);
  }

  @HttpCode(200)
  @Get('order/:orderId')
  async getPaymentByOrderId(@Param() dto: GetOrderByIdDto) {
    return this.paymentService.getPaymentByOrderId(dto);
  }

  @HttpCode(200)
  @Get(':id')
  async getPayment(@Param() dto: GetPaymentDto) {
    return this.paymentService.getPayment(dto);
  }

  @HttpCode(200)
  @Patch('status')
  async updatePayment(@Body() dto: UpdatePaymentStatusDto) {
    return this.paymentService.updatePaymentStatus(dto);
  }

  @HttpCode(200)
  @Get('')
  async getPayments() {
    return this.paymentService.getPayments();
  }
}
