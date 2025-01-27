import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RegisterAdminDto } from './dto';
import { AuthRole } from 'src/auth/type';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  async register(dto: RegisterAdminDto, callerRole: AuthRole) {
    if (![AuthRole.SUPERADMIN, AuthRole.ADMIN].includes(dto.role)) {
      throw new ForbiddenException('only ADMIN or SUPERADMIN can be created');
    }

    if (
      (dto.role === AuthRole.ADMIN || dto.role === AuthRole.SUPERADMIN) &&
      callerRole !== AuthRole.SUPERADMIN
    ) {
      throw new ForbiddenException(
        'Only SUPERADMIN can create ADMIN or SUPERADMIN accounts',
      );
    }
    return this.authService.register(dto, true);
  }
}
