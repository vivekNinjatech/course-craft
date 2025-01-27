import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthRole } from 'src/auth/type';
import { JwtGuard } from 'src/auth/guard';
import { RegisterAdminDto } from './dto/admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @HttpCode(200)
  @Post('register')
  @UseGuards(JwtGuard)
  async register(@Body() dto: RegisterAdminDto, @Req() req: any) {
    let callerRole: AuthRole;
    if (req.user) {
      callerRole = req.user.role;
    }
    return this.adminService.register(dto, callerRole);
  }
}
