import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetUserDataDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class UpdateUserDataDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  username: string;
}
