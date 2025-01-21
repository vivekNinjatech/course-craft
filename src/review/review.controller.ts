import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import {
  CreateReviewDto,
  DeleteReviewDto,
  GetReviewDto,
  GetReviewsByDataItemIdDto,
  GetReviewsByUserIdDto,
  UpdateReviewDto,
} from './dto';

@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @HttpCode(200)
  @Get('')
  async getAllReviews() {
    return this.reviewService.getAllReviews();
  }

  @HttpCode(200)
  @Get('data-item/:dataItemId')
  async getReviewsByDataItemId(@Param() dto: GetReviewsByDataItemIdDto) {
    return this.reviewService.getReviewsByDataItemId(dto);
  }

  @HttpCode(200)
  @Get('user/:userId')
  async getUserReviews(@Param() dto: GetReviewsByUserIdDto) {
    return this.reviewService.getUserReviews(dto);
  }

  @HttpCode(200)
  @Get(':id')
  async getReview(@Param() dto: GetReviewDto) {
    return this.reviewService.getReview(dto);
  }

  @HttpCode(200)
  @Post('')
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewDto);
  }

  @HttpCode(200)
  @Put(':id')
  async updateReview(
    @Param('id', ParseIntPipe) id: UpdateReviewDto['id'],
    @Body() dto: Omit<UpdateReviewDto, 'id'>,
  ) {
    return this.reviewService.updateReview({ id, ...dto });
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteReview(@Param() dto: DeleteReviewDto) {
    return this.reviewService.deleteReview(dto);
  }
}
