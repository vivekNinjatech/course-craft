import { Controller, HttpCode, Param, Post } from '@nestjs/common';
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
  async createDownload(dto: CreateDownloadDto) {
    return this.downloadService.createDownload(dto);
  }

  @HttpCode(200)
  @Post('user/:userId')
  async getDownloadsOfUser(@Param('userId') dto: GetDownloadsByUserDto) {
    return this.downloadService.getDownloadsOfUser(dto);
  }

  @HttpCode(200)
  @Post('data-item/:dataItemId')
  async getDownloadsByDataItemId(
    @Param('dataItemId') dto: GetDownloadsByDataItemIdDto,
  ) {
    return this.downloadService.getDownloadsByDataItemId(dto);
  }

  @HttpCode(200)
  @Post('increment')
  async incrementDownloadCount(dto: IncrementDownloadCountDto) {
    return this.downloadService.incrementDownloadCount(dto);
  }
}
