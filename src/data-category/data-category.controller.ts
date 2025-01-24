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
import { Roles } from 'src/auth/decorator';
import { AuthRole } from 'src/auth/type';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('data-categories')
@UseGuards(JwtGuard, RoleGuard) // Applying guards at the controller level
export class DataCategoryController {
  constructor(private readonly dataCategoryService: DataCategoryService) {}

  @Get('')
  getDataCategories() {
    return this.dataCategoryService.getDataCategories();
  }

  @Get(':id')
  getDataCategoryById(@Param() dto: GetDataCategoryDto) {
    return this.dataCategoryService.getDataCategoryById(dto);
  }

  @Roles(AuthRole.ADMIN)
  @Post('')
  @HttpCode(201)
  createDataCategory(@Body() dto: CreateDataCategoryDto) {
    return this.dataCategoryService.createDataCategory(dto);
  }

  @Roles(AuthRole.ADMIN)
  @Put(':id')
  @HttpCode(200)
  updateDataCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Omit<UpdateDataCategoryDto, 'id'>,
  ) {
    return this.dataCategoryService.updateDataCategory({ id, ...dto });
  }

  @Roles(AuthRole.ADMIN)
  @Delete(':id')
  @HttpCode(200)
  deleteDataCategory(@Param() dto: DeleteDataCategoryDto) {
    return this.dataCategoryService.deleteDataCategory(dto);
  }
}
