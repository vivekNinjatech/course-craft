import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { DataItemService } from './data-item.service';
import { CreateDataItemDto, GetDataItemDto, UpdateDataItemDto } from './dto';

@Controller('data-item')
export class DataItemController {
  constructor(private dataItemService: DataItemService) {}

  @HttpCode(201)
  @Post('create')
  async createDataItem(@Body() dto: CreateDataItemDto) {
    return this.dataItemService.createDataItem(dto);
  }

  @HttpCode(200)
  @Post('get')
  async getDataItems() {
    return this.dataItemService.getDataItems();
  }

  @HttpCode(200)
  @Post('get-by-id')
  async getDataItemById(@Body() dto: GetDataItemDto) {
    return this.dataItemService.getDataItemById(dto);
  }

  @HttpCode(204)
  @Delete('delete')
  async deleteDataItem(@Body() dto: GetDataItemDto) {
    return this.dataItemService.deleteDataItem(dto);
  }

  @HttpCode(200)
  @Post('update')
  async updateDataItem(@Body() dto: UpdateDataItemDto) {
    return this.dataItemService.updateDataItem(dto);
  }
}
