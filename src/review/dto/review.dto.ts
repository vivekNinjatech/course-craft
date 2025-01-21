import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  dataItemId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  @Min(1)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;
}

export class GetReviewsByDataItemIdDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  dataItemId: number;
}

export class GetReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class DeleteReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}

export class UpdateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}

export class GetReviewsByUserIdDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  userId: number;
}
