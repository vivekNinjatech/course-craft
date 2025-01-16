import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import {
  CreateReviewDto,
  DeleteReviewDto,
  GetReviewDto,
  GetReviewsByDataItemIdDto,
  UpdateReviewDto,
} from './dto';

@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @HttpCode(200)
  @Post('')
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewDto);
  }

  @HttpCode(200)
  @Get('/:dataItemId')
  async getReviewsByDataItemId(@Param() dto: GetReviewsByDataItemIdDto) {
    return this.reviewService.getReviewsByDataItemId(dto);
  }

  @HttpCode(200)
  @Get('user/:userId')
  async getUserReviews(@Param() dto: number) {
    return this.reviewService.getUserReviews(dto);
  }

  @HttpCode(200)
  @Get(':id')
  async getReview(@Param() dto: GetReviewDto) {
    return this.reviewService.getReview(dto);
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteReview(@Param() dto: DeleteReviewDto) {
    return this.reviewService.deleteReview(dto.reviewId);
  }

  @HttpCode(200)
  @Put(':id')
  async updateReview(@Param() @Body() dto: UpdateReviewDto) {
    return this.reviewService.updateReview(dto);
  }
}
