import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { DataCategoryModule } from './data-category/data-category.module';
import { DataItemModule } from './data-item/data-item.module';
import { DownloadModule } from './download/download.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { ReviewModule } from './review/review.module';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    DataCategoryModule,
    DataItemModule,
    DownloadModule,
    OrderModule,
    PaymentModule,
    ReviewModule,
    AdminModule,
  ],
})
export class AppModule {}
