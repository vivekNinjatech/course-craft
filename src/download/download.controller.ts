import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
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

  @HttpCode(200)
  @Get('user/:userId')
  async getDownloadsOfUser(@Param() dto: GetDownloadsByUserDto) {
    return this.downloadService.getDownloadsOfUser(dto);
  }

  @HttpCode(200)
  @Get('data-item/:dataItemId')
  async getDownloadsByDataItemId(@Param() dto: GetDownloadsByDataItemIdDto) {
    return this.downloadService.getDownloadsByDataItemId(dto);
  }

  @HttpCode(200)
  @Get('download-count/:dataItemId')
  async getDownloadCountByDataItemId(
    @Param() dto: GetDownloadsByDataItemIdDto,
  ) {
    return this.downloadService.getDownloadCountsByDataItemId(dto);
  }

  @HttpCode(201)
  @Post('')
  async createDownload(@Body() dto: CreateDownloadDto) {
    return this.downloadService.createDownload(dto);
  }

  @HttpCode(200)
  @Patch('increment')
  async incrementDownloadCount(@Body() dto: IncrementDownloadCountDto) {
    return this.downloadService.incrementDownloadCount(dto);
  }
}
