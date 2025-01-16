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
    console.log(dto);
    return this.dataCategoryService.createDataCategory(dto);
  }

  @HttpCode(200)
  @Get(':id')
  async getDataCategoryById(@Param('id', ParseIntPipe) dto: number) {
    return this.dataCategoryService.getDataCategoryById({id: dto});
  }

  @HttpCode(200)
  @Get('')
  async getDataCategories() {
    return this.dataCategoryService.getDataCategories();
  }

  @HttpCode(200)
  @Put(':id')
  async updateDataCategory(
    @Param('id') id: number,
    @Body() dto: UpdateDataCategoryDto,
  ) {
    return this.dataCategoryService.updateDataCategory({
      id,
      ...dto,
    });
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteDataCategory(@Param() dto: DeleteDataCategoryDto) {
    return this.dataCategoryService.deleteDataCategory(dto);
  }
}
