import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreatePaymentDto,
  GetPaymentByOrderIdDto,
  GetPaymentDto,
  UpdatePaymentStatusDto,
} from './dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(dto: CreatePaymentDto) {
    try {
      return await this.prisma.payment.create({
        data: dto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Payment already exists');
      }
      if (error.code === 'P2003') {
        throw new BadRequestException(
          'Foreign key constraint violated. Please check the orderId.',
        );
      }
      throw error;
    }
  }

  async updatePaymentStatus(dto: UpdatePaymentStatusDto) {
    try {
      const payment = await this.prisma.payment.findUnique({
        where: {
          id: dto.id,
        },
      });
      if (!payment) {
        throw new NotFoundException('Payment not found');
      }
      return this.prisma.payment.update({
        where: {
          id: dto.id,
        },
        data: {
          status: dto.status,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Payment already exists');
      }
      if (error.code === 'P2003') {
        throw new BadRequestException(
          'Foreign key constraint violated. Please check the orderId.',
        );
      }
      throw error;
    }
  }

  async getPayment(dto: GetPaymentDto) {
    return this.prisma.payment.findUnique({
      where: {
        id: dto.id,
      },
    });
  }

  async getPaymentByOrderId(dto: GetPaymentByOrderIdDto) {
    return await this.prisma.payment.findFirst({
      where: {
        orderId: dto.orderId,
      },
    });
  }

  async getPayments() {
    return this.prisma.payment.findMany();
  }
}
