import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DownloadService } from './download.service';
import {
  CreateDownloadDto,
  GetDownloadsByDataItemIdDto,
  GetDownloadsByUserDto,
} from './dto';
import { Roles } from '../auth/decorator';
import { AuthRole } from '../auth/type';
import { JwtGuard } from '../auth/guard';
import { RoleGuard } from '../auth/role/role.guard';

@UseGuards(JwtGuard, RoleGuard)
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

  @Roles(AuthRole.USER)
  @HttpCode(201)
  @Post('')
  async createDownload(@Body() dto: CreateDownloadDto) {
    return this.downloadService.createDownload(dto);
  }
}
