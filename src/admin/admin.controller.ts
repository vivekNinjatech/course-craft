import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthRole } from '../auth/type';
import { JwtGuard } from '../auth/guard';
import { RegisterAdminDto } from './dto/admin.dto';
import { RoleGuard } from '../auth/role/role.guard';
import { Roles } from '../auth/decorator';

@Controller('admin')
@UseGuards(JwtGuard, RoleGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Roles(AuthRole.SUPERADMIN)
  @HttpCode(201)
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
