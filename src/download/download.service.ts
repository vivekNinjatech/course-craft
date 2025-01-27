import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateDownloadDto,
  GetDownloadsByDataItemIdDto,
  GetDownloadsByUserDto,
} from './dto';

@Injectable()
export class DownloadService {
  constructor(private prisma: PrismaService) {}

  async createDownload(dto: CreateDownloadDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: dto.userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const dataItem = await this.prisma.dataItem.findUnique({
        where: { id: dto.dataItemId },
      });

      if (!dataItem) {
        throw new NotFoundException('Data item not found');
      }

      const download = await this.prisma.download.upsert({
        where: {
          userId_dataItemId: {
            userId: dto.userId,
            dataItemId: dto.dataItemId,
          },
        },
        update: {
          downloadCount: {
            increment: 1,
          },
        },
        create: {
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
