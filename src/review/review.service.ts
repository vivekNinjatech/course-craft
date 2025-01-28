import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateReviewDto,
  GetReviewsByDataItemIdDto,
  GetReviewDto,
  UpdateReviewDto,
  GetReviewsByUserIdDto,
  DeleteReviewDto,
} from './dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async createReview(dto: CreateReviewDto) {
    try {
      const review = await this.prisma.review.create({
        data: {
          dataItemId: dto.dataItemId,
          userId: dto.userId,
          rating: dto.rating,
          comment: dto.comment,
        },
      });

      return review;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Review already exists');
      }
      if (error.code === 'P2003') {
        throw new BadRequestException(
          'Foreign key constraint violated. Please check the dataItemId.',
        );
      }
      throw error;
    }
  }

  async getReviewsByDataItemId(dto: GetReviewsByDataItemIdDto) {
    return await this.prisma.review.findMany({
      where: {
        dataItemId: dto.dataItemId,
      },
    });
  }

  async getReview(dto: GetReviewDto) {
    return await this.prisma.review.findFirst({
      where: {
        id: dto.id,
      },
    });
  }

  async deleteReview(dto: DeleteReviewDto) {
    try {
      const review = await this.prisma.review.findFirst({
        where: {
          id: dto.id,
        },
      });
      if (!review) {
        throw new NotFoundException('Review not found');
      }
      return this.prisma.review.delete({
        where: {
          id: dto.id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateReview(dto: UpdateReviewDto) {
    try {
      const review = await this.prisma.review.findFirst({
        where: {
          id: dto.id,
        },
      });
      if (!review) {
        throw new NotFoundException('Review not found');
      }
      return this.prisma.review.update({
        where: {
          id: dto.id,
        },
        data: {
          rating: dto.rating,
          comment: dto.comment,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserReviews(dto: GetReviewsByUserIdDto) {
    return await this.prisma.review.findMany({
      where: {
        userId: dto.userId,
      },
    });
  }

  async getAllReviews() {
    return await this.prisma.review.findMany();
  }
}
