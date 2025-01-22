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
  UseGuards,
} from '@nestjs/common';
import { DataCategoryService } from './data-category.service';
import {
  CreateDataCategoryDto,
  DeleteDataCategoryDto,
  GetDataCategoryDto,
  UpdateDataCategoryDto,
} from './dto';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/decorator';
import { AuthRole } from 'src/auth/type';
import { Roles } from 'src/utils/roles.util';

@Controller('data-categories')
@UseGuards(JwtGuard, RolesGuard)
export class DataCategoryController {
  constructor(private dataCategoryService: DataCategoryService) {}

  @HttpCode(200)
  @Get('')
  @Roles(AuthRole.ADMIN)
  async getDataCategories() {
    return this.dataCategoryService.getDataCategories();
  }

  @HttpCode(200)
  @Get(':id')
  async getDataCategoryById(@Param() dto: GetDataCategoryDto) {
    return this.dataCategoryService.getDataCategoryById(dto);
  }

  @HttpCode(201)
  @Post('')
  async createDataCategory(@Body() dto: CreateDataCategoryDto) {
    return this.dataCategoryService.createDataCategory(dto);
  }

  @HttpCode(200)
  @Put(':id')
  async updateDataCategory(
    @Param('id', ParseIntPipe) id: UpdateDataCategoryDto['id'],
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
