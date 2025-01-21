import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrderStatus } from '../type';
import { Type } from 'class-transformer';

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
  @Type(() => Number)
  userId: number;
}

export class GetOrderDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;
}
export class GetOrdersByQueryDto {
  @IsNotEmpty()
  query: Record<string, any>;
}

export class GetOrderByIdDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
