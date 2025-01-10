import { Module } from '@nestjs/common';
import { DataCategoryService } from './data-category.service';
import { DataCategoryController } from './data-category.controller';

@Module({
  providers: [DataCategoryService],
  controllers: [DataCategoryController],
})
export class DataCategoryModule {}
