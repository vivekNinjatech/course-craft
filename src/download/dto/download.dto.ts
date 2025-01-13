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
export class getDownloadCountForDataItemOfUserDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  dataItemId: number;
}

export class IncrementDownloadCountDto {
  @IsNotEmpty()
  @IsNumber()
  dataItemId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
