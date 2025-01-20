import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto, GetPaymentDto, UpdatePaymentStatusDto } from './dto';
import { GetOrderByIdDto, GetOrderDto } from 'src/order/dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(dto: CreatePaymentDto) {
    return await this.prisma.payment.create({
      data: dto,
    });
  }

  async updatePaymentStatus(dto: UpdatePaymentStatusDto) {
    try {
      const payment = await this.prisma.payment.findUnique({
        where: {
          id: dto.id,
        },
      });
      if (!payment) {
        throw new ForbiddenException('Payment not found');
      }
      return this.prisma.payment.update({
        where: {
          id: dto.id,
        },
        data: {
          status: dto.status,
        },
      });
    } catch (error) {}
  }

  async getPayment(dto: GetPaymentDto) {
    return this.prisma.payment.findUnique({
      where: {
        id: dto.id,
      },
    });
  }

  async getPaymentByOrderId(orderId: GetOrderByIdDto) {
    return await this.prisma.payment.findFirst({
      where: {
        orderId: orderId.id,
      },
    });
  }

  async getPayments() {
    return this.prisma.payment.findMany();
  }
}
