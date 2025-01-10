import { IsNotEmpty, IsNumber, IsString, Max, Min, min } from 'class-validator';
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
