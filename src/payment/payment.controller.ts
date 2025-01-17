import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
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
  async createPayment(@Body() dto: CreatePaymentDto) {
    return this.paymentService.createPayment(dto);
  }

  @HttpCode(200)
  @Get('order/:orderId')
  async getPaymentByOrderId(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.paymentService.getPaymentByOrderId(orderId);
  }

  @HttpCode(200)
  @Get(':id')
  async getPayment(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.getPayment({ id });
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
