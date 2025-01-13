import { Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { DataCategoryService } from './data-category.service';
import {
  CreateDataCategoryDto,
  DeleteDataCategoryDto,
  GetDataCategoryDto,
  UpdateDataCategoryDto,
} from './dto';

@Controller('data-category')
export class DataCategoryController {
  constructor(private dataCategoryService: DataCategoryService) {}

  @HttpCode(201)
  @Post('create')
  async createDataCategory(dto: CreateDataCategoryDto) {
    return this.dataCategoryService.createDataCategory(dto);
  }

  @HttpCode(200)
  @Post('get')
  async getDataCategoryById(dto: GetDataCategoryDto) {
    return this.dataCategoryService.getDataCategoryById(dto);
  }

  @HttpCode(200)
  @Post('get-all')
  async getDataCategories() {
    return this.dataCategoryService.getDataCategories();
  }

  @HttpCode(200)
  @Post('update')
  async updateDataCategory(dto: UpdateDataCategoryDto) {
    return this.dataCategoryService.updateDataCategory(dto);
  }

  @HttpCode(204)
  @Delete('delete')
  async deleteDataCategory(dto: DeleteDataCategoryDto) {
    return this.dataCategoryService.deleteDataCategory(dto);
  }
}
