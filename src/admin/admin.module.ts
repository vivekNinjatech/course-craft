import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [JwtModule.register({}), PrismaModule],
  controllers: [AdminController],
  providers: [AdminService, JwtService, AuthService],
})
export class AdminModule {}
