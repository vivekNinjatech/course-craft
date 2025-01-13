import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetUserDataDto, UpdateUserDataDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUser(userId: number, dto: UpdateUserDataDto) {
    const user = this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
  }
}
