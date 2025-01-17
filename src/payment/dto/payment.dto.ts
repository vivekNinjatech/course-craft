import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PaymentStatus } from '../type/payment.type';

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
  id: number;

  @IsNotEmpty()
  @IsString()
  status: PaymentStatus;
}

export class GetPaymentDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
