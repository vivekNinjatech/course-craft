import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderDto,
  GetAllUserOrdersDto,
  GetOrderDto,
  GetOrdersByQueryDto,
  UpdateOrderStatusDto,
} from './dto';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @HttpCode(201)
  @Post('')
  async createOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }

  @HttpCode(200)
  @Put(':id/:status')
  async updateOrderStatus(@Param() dto: UpdateOrderStatusDto) {
    return this.orderService.updateOrderStatus(dto);
  }

  @HttpCode(200)
  @Get('user/:userId')
  async getUserOrders(@Param() dto: GetAllUserOrdersDto) {
    return this.orderService.getUserOrders(dto);
  }

  @HttpCode(200)
  @Get(':id')
  async getOrderById(@Param() dto: GetOrderDto) {
    return this.orderService.getOrderById(dto);
  }

  @HttpCode(200)
  @Get('')
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @HttpCode(200)
  @Get('search/:query')
  async getOrdersByQuery(@Param() query: GetOrdersByQueryDto) {
    return this.orderService.getOrdersByQuery(query);
  }
}
