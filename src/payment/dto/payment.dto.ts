import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PaymentStatus } from '../type/payment.type';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsNotEmpty()
  @IsString()
  status: PaymentStatus;
}

export class UpdatePaymentStatusDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsNotEmpty()
  @IsString()
  status: PaymentStatus;
}

export class GetPaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class GetPaymentByOrderIdDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  orderId: number;
}
