import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import {
  CreateReviewDto,
  DeleteReviewDto,
  GetReviewDto,
  GetReviewsByDataItemIdDto,
} from './dto';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @HttpCode(200)
  @Post('create')
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewDto);
  }

  @HttpCode(200)
  @Get('get-reviews-by-data-item/:dataItemId')
  async getReviewsByDataItemId(@Param() dto: GetReviewsByDataItemIdDto) {
    return this.reviewService.getReviewsByDataItemId(dto);
  }

  @HttpCode(200)
  @Get('get-review/:reviewId')
  async getReview(@Param() dto: GetReviewDto) {
    return this.reviewService.getReview(dto);
  }

  @HttpCode(200)
  @Get('delete/:reviewId')
  async deleteReview(@Param('reviewId') dto: DeleteReviewDto) {
    return this.reviewService.deleteReview(dto.reviewId);
  }
}
