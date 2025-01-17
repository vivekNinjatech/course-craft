import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { DownloadService } from './download.service';
import {
  CreateDownloadDto,
  GetDownloadsByDataItemIdDto,
  GetDownloadsByUserDto,
  IncrementDownloadCountDto,
} from './dto';

@Controller('downloads')
export class DownloadController {
  constructor(private downloadService: DownloadService) {}

  @HttpCode(201)
  @Post('')
  async createDownload(@Body() dto: CreateDownloadDto) {
    return this.downloadService.createDownload(dto);
  }

  @HttpCode(200)
  @Get('user/:userId')
  async getDownloadsOfUser(@Param('userId', ParseIntPipe) id: number) {
    return this.downloadService.getDownloadsOfUser({ userId: id });
  }

  @HttpCode(200)
  @Get('data-item/:dataItemId')
  async getDownloadsByDataItemId(
    @Param('dataItemId', ParseIntPipe) id: number,
  ) {
    return this.downloadService.getDownloadsByDataItemId({ dataItemId: id });
  }

  @HttpCode(200)
  @Patch('increment')
  async incrementDownloadCount(@Body() dto: IncrementDownloadCountDto) {
    return this.downloadService.incrementDownloadCount(dto);
  }

  @HttpCode(200)
  @Get('download-count/:dataItemId')
  async getDownloadCountByDataItemId(
    @Param('dataItemId', ParseIntPipe) id: number,
  ) {
    return this.downloadService.getDownloadCountsByDataItemId({
      dataItemId: id,
    });
  }
}
