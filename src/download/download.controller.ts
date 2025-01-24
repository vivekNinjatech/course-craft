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
import { Roles } from 'src/auth/decorator';
import { AuthRole } from 'src/auth/type';
import { JwtGuard } from 'src/auth/guard';
import { RoleGuard } from 'src/auth/role/role.guard';

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
