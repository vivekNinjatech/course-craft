import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChangePasswordDto, GetUserDataDto, UpdateUserDataDto } from './dto';
import * as argon from 'argon2';

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
      throw new NotFoundException('User not found');
    }
    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    delete updatedUser.password;
    return updatedUser;
  }

  async changePassword(email: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const result = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: await argon.hash(dto.password),
      },
    });

    return result;
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }
}
