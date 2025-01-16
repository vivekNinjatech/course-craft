import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrderStatus } from '../type';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  dataItemId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  status: OrderStatus;
}

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  status: OrderStatus;
}

export class GetAllUserOrdersDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class GetOrderDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;
}
export class GetOrdersByQueryDto {
  @IsNotEmpty()
  @IsString()
  query: string;
}
