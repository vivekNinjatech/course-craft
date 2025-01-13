import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateDownloadDto,
  getDownloadCountForDataItemOfUserDto,
  IncrementDownloadCountDto,
} from './dto';

@Injectable()
export class DownloadService {
  constructor(private prisma: PrismaService) {}

  async createDownload(dto: CreateDownloadDto) {
    try {
      const download = await this.prisma.download.create({
        data: {
          userId: dto.userId,
          dataItemId: dto.dataItemId,
          downloadCount: 1,
        },
      });
      return download;
    } catch (error) {
      throw error;
    }
  }

  async getDownloadsOfUser(dto: getDownloadCountForDataItemOfUserDto) {
    try {
      const downloads = await this.prisma.download.findFirst({
        where: {
          dataItemId: dto.dataItemId,
          userId: dto.userId,
        },
      });
      return downloads;
    } catch (error) {
      throw error;
    }
  }

  async incrementDownloadCount(dto: IncrementDownloadCountDto) {
    try {
      const downloads = await this.prisma.download.findFirst({
        where: {
          dataItemId: dto.dataItemId,
          userId: dto.userId,
        },
      });
      if (!downloads) {
        throw new ForbiddenException('Downloads for this data item not found');
      }
      return this.prisma.download.update({
        where: {
          id: downloads.id,
          dataItemId: dto.dataItemId,
          userId: dto.userId,
        },
        data: {
          downloadCount: downloads.downloadCount + 1,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
