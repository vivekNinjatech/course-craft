import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaController } from './prisma.controller';

@Module({
  providers: [PrismaService],
  controllers: [PrismaController]
})
export class PrismaModule {}
