import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { AuthRole } from './types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signUp(dto: AuthDto) {
    try {
      const hash: string = await argon.hash(dto.password);
      const user: any = await this.prisma.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          password: hash,
          role: AuthRole.USER,
        },
      });
      delete user.password;

      return this.signtoken(user.id, user.email);
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Credentials already taken');
        }
      }
      throw error;
    }
  }

  async signIn(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const isCorrectPassword = await argon.verify(user.password, dto.password);

    if (!isCorrectPassword) {
      throw new ForbiddenException('Credentials incorrect');
    }

    delete user.password;

    return this.signtoken(user.id, user.email);
  }
  async signtoken(userId: number, email: string) {
    const data = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(data, {
      expiresIn: '1d',
      secret,
    });

    return { access_token: token };
  }
}
