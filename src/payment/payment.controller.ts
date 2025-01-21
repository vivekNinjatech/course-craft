import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import {
  CreatePaymentDto,
  GetPaymentByOrderIdDto,
  GetPaymentDto,
  UpdatePaymentStatusDto,
} from './dto';

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @HttpCode(200)
  @Get('')
  async getPayments() {
    return this.paymentService.getPayments();
  }

  @HttpCode(200)
  @Get('order/:orderId')
  async getPaymentByOrderId(@Param() dto: GetPaymentByOrderIdDto) {
    return this.paymentService.getPaymentByOrderId(dto);
  }

  @HttpCode(200)
  @Get(':id')
  async getPayment(@Param() dto: GetPaymentDto) {
    return this.paymentService.getPayment(dto);
  }

  @HttpCode(201)
  @Post('')
  async createPayment(@Body() dto: CreatePaymentDto) {
    return this.paymentService.createPayment(dto);
  }

  @HttpCode(200)
  @Patch(':id')
  async updatePayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Omit<UpdatePaymentStatusDto, 'id'>,
  ) {
    return this.paymentService.updatePaymentStatus({ id, ...dto });
  }
}
