import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateReviewDto,
  GetReviewsByDataItemIdDto,
  GetReviewDto,
  UpdateReviewDto,
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
        id: dto.reviewId,
      },
    });
  }

  async deleteReview(reviewId: number) {
    try {
      const review = await this.prisma.review.findFirst({
        where: {
          id: reviewId,
        },
      });
      if (!review) {
        throw new ForbiddenException('Review not found');
      }
      return this.prisma.review.delete({
        where: {
          id: reviewId,
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
          id: dto.reviewId,
        },
      });
      if (!review) {
        throw new ForbiddenException('Review not found');
      }
      return this.prisma.review.update({
        where: {
          id: dto.reviewId,
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

  async getUserReviews(userId: number) {
    return await this.prisma.review.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
