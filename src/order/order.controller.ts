import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderDto,
  GetAllUserOrdersDto,
  GetOrderDto,
  UpdateOrderStatusDto,
} from './dto';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @HttpCode(200)
  @Get('')
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @HttpCode(200)
  @Get('user/:userId')
  async getUserOrders(@Param() dto: GetAllUserOrdersDto) {
    return this.orderService.getUserOrders(dto);
  }

  @HttpCode(200)
  @Get('search')
  async getOrdersByQuery(@Query() query: Record<string, any>) {
    return this.orderService.getOrdersByQuery(query);
  }

  @HttpCode(200)
  @Get(':orderId')
  async getOrderById(@Param() dto: GetOrderDto) {
    return this.orderService.getOrderById(dto);
  }

  @HttpCode(201)
  @Post('')
  async createOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }

  @HttpCode(200)
  @Patch(':orderId')
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body() dto: Omit<UpdateOrderStatusDto, 'orderId'>,
  ) {
    return this.orderService.updateOrderStatus({
      orderId,
      ...dto,
    });
  }
}
