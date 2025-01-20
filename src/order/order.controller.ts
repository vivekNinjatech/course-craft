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
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderDto,
  GetAllUserOrdersDto,
  GetOrderDto,
  GetOrdersByQueryDto,
  UpdateOrderStatusDto,
} from './dto';
import { OrderStatus } from './type';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @HttpCode(200)
  @Get('search')
  async getOrdersByQuery(@Query() query: Record<string, any>) {
    return this.orderService.getOrdersByQuery(query);
  }

  @HttpCode(201)
  @Post('')
  async createOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }

  @HttpCode(200)
  @Patch(':orderId/:status')
  async updateOrderStatus(@Param('status') dto: UpdateOrderStatusDto) {
    return this.orderService.updateOrderStatus(dto);
  }

  @HttpCode(200)
  @Get('user/:userId')
  async getUserOrders(@Param() dto: GetAllUserOrdersDto) {
    return this.orderService.getUserOrders(dto);
  }

  @HttpCode(200)
  @Get(':orderId')
  async getOrderById(@Param() dto: GetOrderDto) {
    return this.orderService.getOrderById(dto);
  }

  @HttpCode(200)
  @Get('')
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }
}
