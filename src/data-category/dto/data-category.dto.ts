import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateDataCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class GetDataCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class UpdateDataCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class DeleteDataCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
