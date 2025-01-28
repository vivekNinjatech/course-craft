import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
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
      if (error.code === 'P2002') {
        throw new ConflictException('Order already exists');
      }
      if (error.code === 'P2003') {
        throw new BadRequestException(
          'Foreign key constraint violated. Please check the dataItemId.',
        );
      }
      throw error;
    }
  }

  async updateOrderStatus(dto: UpdateOrderStatusDto) {
    try {
      const order = await this.prisma.order.findUnique({
        where: {
          orderId: dto.orderId,
        },
      });
      if (!order) {
        throw new NotFoundException('Order not found');
      }

      const updatedOrder = await this.prisma.order.update({
        where: {
          orderId: dto.orderId,
        },
        data: {
          status: dto.status,
        },
      });

      return updatedOrder;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Order already exists');
      }
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

  async getAllOrders() {
    try {
      const orders = await this.prisma.order.findMany();
      return orders;
    } catch (error) {
      throw error;
    }
  }

  async getOrdersByQuery(query: Record<string, any>) {
    try {
      const filters: Record<string, any> = {};

      const validFields = [
        'id',
        'userId',
        'dataItemId',
        'orderDate',
        'amount',
        'status',
        'orderId',
      ];

      for (const key of Object.keys(query)) {
        if (!validFields.includes(key)) {
          throw new BadRequestException('Invalid field provided for search.');
        }
      }

      const numericFields = ['id', 'userId', 'dataItemId', 'amount'];

      for (const key of Object.keys(query)) {
        if (numericFields.includes(key)) {
          filters[key] = parseInt(query[key], 10);
          if (isNaN(filters[key])) {
            throw new BadRequestException(
              `Invalid value for field "${key}". Expected a number.`,
            );
          }
        } else if (key === 'orderDate') {
          const parsedDate = new Date(query[key]);
          if (isNaN(parsedDate.getTime())) {
            throw new BadRequestException(
              `Invalid value for field "orderDate". Expected a valid date string.`,
            );
          }
          filters[key] = parsedDate;
        } else {
          filters[key] = query[key];
        }
      }

      const orders = await this.prisma.order.findMany({
        where: filters,
      });
      return orders;
    } catch (error) {
      throw error;
    }
  }
}
