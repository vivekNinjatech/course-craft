import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto, GetPaymentDto, UpdatePaymentStatusDto } from './dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(dto: CreatePaymentDto) {
    return await this.prisma.payment.create({
      data: dto,
    });
  }

  async updatePaymentStatus(dto: UpdatePaymentStatusDto) {
    console.log(dto);
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

  async getPaymentByOrderId(orderId: number) {
    console.log(orderId);
    return await this.prisma.payment.findFirst({
      where: {
        orderId: orderId, // Correct filter
      },
    });
  }

  async getPayments() {
    return this.prisma.payment.findMany();
  }
}
