import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDownloadDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  dataItemId: number;

  @IsNotEmpty()
  @IsNumber()
  downloadCount: number;
}
export class GetDownloadsByUserDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  userId: number;
}

export class IncrementDownloadCountDto {
  @IsNotEmpty()
  @IsNumber()
  dataItemId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

export class GetDownloadsByDataItemIdDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  dataItemId: number;
}
