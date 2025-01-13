import { Controller, HttpCode, Param, Post } from '@nestjs/common';
import { DownloadService } from './download.service';
import {
  CreateDownloadDto,
  getDownloadCountForDataItemOfUserDto,
  IncrementDownloadCountDto,
} from './dto';

@Controller('download')
export class DownloadController {
  constructor(private downloadService: DownloadService) {}

  @HttpCode(201)
  @Post('create')
  async createDownload(dto: CreateDownloadDto) {
    return this.downloadService.createDownload(dto);
  }

  @HttpCode(200)
  @Post('increment')
  async incrementDownloadCount(dto: IncrementDownloadCountDto) {
    return this.downloadService.incrementDownloadCount(dto);
  }

  @HttpCode(200)
  @Post('get/:dataItemId/:userId')
  async getDownloadsOfUser(
    @Param('dataItemId') dataItemId: number,
    @Param('userId') userId: number,
  ) {
    return this.downloadService.getDownloadsOfUser({ dataItemId, userId });
  }
}
