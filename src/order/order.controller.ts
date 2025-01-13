import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderDto,
  GetAllUserOrdersDto,
  UpdateOrderStatusDto,
} from './dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @HttpCode(201)
  @Post('create')
  async createOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }

  @HttpCode(200)
  @Post('update-status')
  async updateOrderStatus(@Body() dto: UpdateOrderStatusDto) {
    return this.orderService.updateOrderStatus(dto);
  }

  @HttpCode(200)
  @Post('get-user-orders')
  async getUserOrders(@Body() dto: GetAllUserOrdersDto) {
    return this.orderService.getUserOrders(dto);
  }

  @HttpCode(200)
  @Post('get-order/:orderId')
  async getOrderById(@Param() orderId: string) {
    return this.orderService.getOrderById({ orderId });
  }
}
