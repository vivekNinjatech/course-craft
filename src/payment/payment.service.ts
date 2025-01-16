import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto, GetPaymentDto, UpdatePaymentStatusDto } from './dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(dto: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: dto,
    });
  }

  async updatePayment(dto: UpdatePaymentStatusDto) {
    try {
      const payment = await this.prisma.payment.findUnique({
        where: {
          id: dto.paymentId,
        },
      });
      if (!payment) {
        throw new ForbiddenException('Payment not found');
      }
      return this.prisma.payment.update({
        where: {
          id: dto.paymentId,
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
        id: dto.paymentId,
      },
    });
  }
}
