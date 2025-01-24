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
import { DataItemService } from './data-item.service';
import {
  CreateDataItemDto,
  DeleteDataItemDto,
  GetDataItemDto,
  GetDataItemsByDto,
  UpdateDataItemDto,
} from './dto';
import { JwtGuard } from 'src/auth/guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/decorator';
import { AuthRole } from 'src/auth/type';

@UseGuards(JwtGuard, RoleGuard)
@Controller('data-items')
export class DataItemController {
  constructor(private dataItemService: DataItemService) {}

  @HttpCode(200)
  @Get('')
  async getDataItems() {
    return this.dataItemService.getDataItems();
  }

  @HttpCode(200)
  @Get(':id')
  async getDataItemById(@Param() dto: GetDataItemDto) {
    return this.dataItemService.getDataItemById(dto);
  }

  @HttpCode(200)
  @Get(':title')
  async getDataItemsByQuery(@Param() dto: GetDataItemsByDto) {
    return this.dataItemService.getDataItemsByQuery(dto);
  }

  @Roles(AuthRole.ADMIN)
  @HttpCode(201)
  @Post('')
  async createDataItem(@Body() dto: CreateDataItemDto) {
    return this.dataItemService.createDataItem(dto);
  }

  @Roles(AuthRole.ADMIN)
  @HttpCode(200)
  @Put(':id')
  async updateDataItem(
    @Param('id', ParseIntPipe) id: UpdateDataItemDto['id'],
    @Body() dto: Omit<UpdateDataItemDto, 'id'>,
  ) {
    return this.dataItemService.updateDataItem({
      id,
      ...dto,
    });
  }

  @Roles(AuthRole.ADMIN)
  @HttpCode(200)
  @Delete(':id')
  async deleteDataItem(@Param() dto: DeleteDataItemDto) {
    return this.dataItemService.deleteDataItem(dto);
  }
}
