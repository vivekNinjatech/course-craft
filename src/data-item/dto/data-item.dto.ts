import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDataItemDto {
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  fileUrl: string;
}

export class GetDataItemDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class DeleteDataItemDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class UpdateDataItemDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  fileUrl: string;
}

export class GetDataItemsByDto {
  @IsNotEmpty()
  @IsString()
  @Type(() => Number)
  query: string;
}
