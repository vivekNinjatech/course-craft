import { Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth')
export class AuthController {
    constructor(
        private prisma: PrismaService,
        private config: ConfigService
    ) {}    

    async login(loginDto: ) {

    }
}
