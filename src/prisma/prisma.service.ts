import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient{
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL')
                }
            }
        })
    }

    cleanDb(){
        this.$transaction([
            this.user.deleteMany(),
            this.dataCategory.deleteMany(),
            this.dataItem.deleteMany(),
            this.payment.deleteMany(),
            this.download.deleteMany(),
            this.review.deleteMany(),
            this.order.deleteMany()
        ])
    }
}
