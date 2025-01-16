import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DataItemService } from './data-item.service';
import {
  CreateDataItemDto,
  GetDataItemDto,
  GetDataItemsByDto,
  UpdateDataItemDto,
} from './dto';

@Controller('data-items')
export class DataItemController {
  constructor(private dataItemService: DataItemService) {}

  @HttpCode(201)
  @Post('')
  async createDataItem(@Body() dto: CreateDataItemDto) {
    return this.dataItemService.createDataItem(dto);
  }

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

  @HttpCode(204)
  @Delete(':id')
  async deleteDataItem(@Param() dto: GetDataItemDto) {
    return this.dataItemService.deleteDataItem(dto);
  }

  @HttpCode(200)
  @Put(':id')
  async updateDataItem(
    @Param('id') id: number,
    @Body() dto: UpdateDataItemDto,
  ) {
    return this.dataItemService.updateDataItem({
      id,
      ...dto,
    });
  }

  @HttpCode(200)
  @Get(':title')
  async getDataItemsByQuery(@Param() dto: GetDataItemsByDto) {
    return this.dataItemService.getDataItemsByQuery(dto);
  }
}
