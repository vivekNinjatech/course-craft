import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AuthRole } from '../../auth/type';

export class RegisterAdminDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(AuthRole, { message: 'role must be ADMIN or SUPERADMIN' })
  role: AuthRole;
}
