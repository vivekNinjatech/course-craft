import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateOrderDto,
  GetAllUserOrdersDto,
  GetOrderDto,
  UpdateOrderStatusDto,
} from './dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(dto: CreateOrderDto) {
    try {
      const order = await this.prisma.order.create({
        data: {
          orderId: dto.orderId,
          userId: dto.userId,
          dataItemId: dto.dataItemId,
          amount: dto.amount,
          status: dto.status,
        },
      });
      return order;
    } catch (error) {
      throw error;
    }
  }

  async updateOrderStatus(dto: UpdateOrderStatusDto) {
    try {
      const order = await this.prisma.order.update({
        where: {
          orderId: dto.orderId,
        },
        data: {
          status: dto.status,
        },
      });
      return order;
    } catch (error) {
      throw error;
    }
  }

  async getUserOrders(dto: GetAllUserOrdersDto) {
    try {
      const orders = await this.prisma.order.findMany({
        where: {
          userId: dto.userId,
        },
      });
      return orders;
    } catch (error) {
      throw error;
    }
  }

  async getOrderById(dto: GetOrderDto) {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          orderId: dto.orderId,
        },
      });
      return order;
    } catch (error) {
      throw error;
    }
  }
}
