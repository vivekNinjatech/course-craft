import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import {
  CreateReviewDto,
  DeleteReviewDto,
  GetReviewDto,
  GetReviewsByDataItemIdDto,
  UpdateReviewDto,
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
  @Delete('delete/:reviewId')
  async deleteReview(@Param('reviewId') dto: DeleteReviewDto) {
    return this.reviewService.deleteReview(dto.reviewId);
  }

  @HttpCode(200)
  @Patch('update/:reviewId')
  async updateReview(@Param('reviewId') @Body() dto: UpdateReviewDto) {
    return this.reviewService.updateReview(dto);
  }
}
