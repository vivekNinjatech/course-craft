import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DataCategoryService } from './data-category.service';
import {
  CreateDataCategoryDto,
  DeleteDataCategoryDto,
  GetDataCategoryDto,
  UpdateDataCategoryDto,
} from './dto';

@Controller('data-categories')
export class DataCategoryController {
  constructor(private dataCategoryService: DataCategoryService) {}

  @HttpCode(201)
  @Post('')
  async createDataCategory(@Body() dto: CreateDataCategoryDto) {
    return this.dataCategoryService.createDataCategory(dto);
  }

  @HttpCode(200)
  @Get(':id')
  async getDataCategoryById(@Param() dto: GetDataCategoryDto) {
    return this.dataCategoryService.getDataCategoryById(dto);
  }

  @HttpCode(200)
  @Get('')
  async getDataCategories() {
    return this.dataCategoryService.getDataCategories();
  }

  @HttpCode(200)
  @Put(':id')
  async updateDataCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Omit<UpdateDataCategoryDto, 'id'>,
  ) {
    return this.dataCategoryService.updateDataCategory({ id, ...dto });
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteDataCategory(@Param() dto: DeleteDataCategoryDto) {
    return this.dataCategoryService.deleteDataCategory(dto);
  }
}
