import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateDataCategoryDto,
  DeleteDataCategoryDto,
  GetDataCategoryDto,
  UpdateDataCategoryDto,
} from './dto';

@Injectable()
export class DataCategoryService {
  constructor(private prisma: PrismaService) {}

  async createDataCategory(dto: CreateDataCategoryDto) {
    try {
      const dataCategory = await this.prisma.dataCategory.create({
        data: {
          name: dto.name,
          description: dto.description,
        },
      });
      return dataCategory;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Data category already exists');
      }
      throw error;
    }
  }

  async getDataCategoryById(dto: GetDataCategoryDto) {
    try {
      const dataCategory = await this.prisma.dataCategory.findFirst({
        where: {
          id: dto.id,
        },
      });
      return dataCategory;
    } catch (error) {
      throw error;
    }
  }

  async getDataCategories() {
    try {
      const dataCategories = await this.prisma.dataCategory.findMany();
      return dataCategories;
    } catch (error) {
      throw error;
    }
  }

  async deleteDataCategory(dto: DeleteDataCategoryDto) {
    try {
      const dataCategory = await this.prisma.dataCategory.findFirst({
        where: {
          id: dto.id,
        },
      });
      if (!dataCategory) {
        throw new NotFoundException('Data category not found');
      }

      return await this.prisma.dataCategory.delete({
        where: {
          id: dto.id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateDataCategory(dto: UpdateDataCategoryDto) {
    try {
      const dataCategory = await this.prisma.dataCategory.findFirst({
        where: {
          id: dto.id,
        },
      });
      if (!dataCategory) {
        throw new NotFoundException('Data category not found');
      }
      return this.prisma.dataCategory.update({
        where: {
          id: dto.id,
        },
        data: {
          ...dto,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Data category already exists');
      }
      if (error.code === 'P2003') {
        throw new BadRequestException(
          'Foreign key constraint violated. Please check the categoryId.',
        );
      }
      throw error;
    }
  }
}
