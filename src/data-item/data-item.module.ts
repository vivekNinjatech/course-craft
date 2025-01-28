import { Module } from '@nestjs/common';
import { DataItemService } from './data-item.service';
import { DataItemController } from './data-item.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DataItemService],
  controllers: [DataItemController],
})
export class DataItemModule {}
