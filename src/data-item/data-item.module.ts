import { Module } from '@nestjs/common';
import { DataItemService } from './data-item.service';
import { DataItemController } from './data-item.controller';

@Module({
  providers: [DataItemService],
  controllers: [DataItemController],
})
export class DataItemModule {}
