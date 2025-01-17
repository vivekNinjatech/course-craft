import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateDownloadDto,
  GetDownloadsByDataItemIdDto,
  GetDownloadsByUserDto,
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

  async getDownloadsOfUser(dto: GetDownloadsByUserDto) {
    try {
      const downloads = await this.prisma.download.findFirst({
        where: {
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

  async getDownloadsByDataItemId(dto: GetDownloadsByDataItemIdDto) {
    try {
      const downloads = await this.prisma.download.findFirst({
        where: {
          dataItemId: dto.dataItemId,
        },
      });
      return downloads;
    } catch (error) {
      throw error;
    }
  }

  async getDownloadCountsByDataItemId(dto: GetDownloadsByDataItemIdDto) {
    try {
      const downloads = await this.prisma.download.findMany({
        where: {
          dataItemId: dto.dataItemId,
        },
      });
      return downloads.map((download) => {
        return {
          dataItemId: dto.dataItemId,
          downloadCount: download.downloadCount,
        };
      });
    } catch (error) {
      throw error;
    }
  }
}
