import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  // make a review
  async createReview(dto: CreateReviewDto) {
    const review = await this.prisma.review.create(
      {
        data: {
          dataItemId: dto.dataItemId,
          userId: dto.userId,
          rating: dto.rating,
          comment: dto.comment,
        },
      }
    )
  }

  // get all reviews

  // get single review

  // delete review
}
