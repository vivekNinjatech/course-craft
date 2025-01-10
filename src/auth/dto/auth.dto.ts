import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AuthRole } from '../types';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  role?: AuthRole;
}
