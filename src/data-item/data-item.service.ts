import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateDataItemDto,
  DeleteDataItemDto,
  GetDataItemDto,
  UpdateDataItemDto,
} from './dto';

@Injectable()
export class DataItemService {
  constructor(private prisma: PrismaService) {}

  async createDataItem(dto: CreateDataItemDto) {
    try {
      const dataItem = await this.prisma.dataItem.create({
        data: {
          title: dto.title,
          description: dto.description,
          categoryId: dto.categoryId,
          fileUrl: dto.fileUrl,
          price: dto.price,
        },
      });
      return dataItem;
    } catch (error) {
      throw error;
    }
  }

  async getDataItems() {
    try {
      const dataItems = await this.prisma.dataItem.findMany();
      return dataItems;
    } catch (error) {
      throw error;
    }
  }

  async getDataItemById(dto: GetDataItemDto) {
    try {
      const dataItem = await this.prisma.dataItem.findUnique({
        where: {
          id: dto.id,
        },
      });
      return dataItem;
    } catch (error) {
      throw error;
    }
  }

  async deleteDataItem(dto: DeleteDataItemDto) {
    try {
      const dataItem = await this.prisma.dataItem.delete({
        where: {
          id: dto.id,
        },
      });
      return dataItem;
    } catch (error) {
      throw error;
    }
  }

  async updateDataItem(dto: UpdateDataItemDto) {
    try {
      const dataItem = await this.prisma.dataItem.findFirst({
        where: {
          id: dto.id,
        },
      });
      if (!dataItem) {
        throw new ForbiddenException('Data item not found');
      }
      return this.prisma.dataItem.update({
        where: {
          id: dto.id,
        },
        data: {
          ...dto,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
