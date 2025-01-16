import { Module } from '@nestjs/common';
import { DataCategoryService } from './data-category.service';
import { DataCategoryController } from './data-category.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DataCategoryService],
  controllers: [DataCategoryController],
})
export class DataCategoryModule {}
