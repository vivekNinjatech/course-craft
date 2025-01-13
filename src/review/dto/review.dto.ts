import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
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

  @IsNotEmpty()
  @IsString()
  comment: string;
}

export class GetReviewsByDataItemIdDto {
  @IsNotEmpty()
  @IsNumber()
  dataItemId: number;
}

export class GetReviewDto {
  @IsNotEmpty()
  @IsNumber()
  reviewId: number;
}

export class DeleteReviewDto {
  @IsNotEmpty()
  @IsNumber()
  reviewId: number;
}

export class UpdateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
