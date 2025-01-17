import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  id: number;
}

export class UpdateDataCategoryDto {
  @IsNotEmpty()
  @IsNumber()
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
  id: number;
}
