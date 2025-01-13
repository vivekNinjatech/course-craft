import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator';
import { UpdateUserDataDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(200)
  @Get('me')
  async getMe(@GetUser() user: any) {
    return user;
  }

  @HttpCode(200)
  @Patch('update')
  async updateUser(
    @GetUser('id') userId: number,
    @Body() dto: UpdateUserDataDto,
  ) {
    return this.userService.updateUser(userId, dto);
  }
}
