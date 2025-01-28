import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { GetUser, Roles } from '../auth/decorator';
import { UpdateUserDataDto } from './dto';
import { AuthRole } from '../auth/type';
import { RoleGuard } from '../auth/role/role.guard';

@UseGuards(JwtGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(AuthRole.ADMIN, AuthRole.SUPERADMIN)
  @HttpCode(200)
  @Get('')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @HttpCode(200)
  @Get('profile')
  async getMe(@GetUser() user: any) {
    delete user.password;
    return user;
  }

  @HttpCode(200)
  @Put('profile')
  async updateUser(
    @GetUser('id') userId: number,
    @Body() dto: UpdateUserDataDto,
  ) {
    return this.userService.updateUser(userId, dto);
  }

  @HttpCode(200)
  @Patch('change-password')
  async changePassword(@GetUser('email') email: string, @Body() dto: any) {
    return this.userService.changePassword(email, dto);
  }
}
