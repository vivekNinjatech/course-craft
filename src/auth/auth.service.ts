import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';
import * as argon from 'argon2';
import { AuthRole } from './type';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto, callerRole: AuthRole) {
    try {
      if (dto.role === AuthRole.ADMIN && callerRole !== AuthRole.SUPERADMIN) {
        throw new ForbiddenException(
          'Only SUPERADMIN can create ADMIN accounts',
        );
      }
      const hash: string = await argon.hash(dto.password);
      const user: any = await this.prisma.user.create({
        data: {
          email: dto.email.toLowerCase(),
          username: dto.username,
          password: hash,
          role: dto.role,
        },
      });
      delete user.password;

      return this.signtoken(user.id, user.email, user.role);
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials already taken');
        }
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
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

    return this.signtoken(user.id, user.email, user.role as AuthRole);
  }
  async signtoken(userId: number, email: string, role: AuthRole) {
    const data = {
      sub: userId,
      email,
      role,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(data, {
      expiresIn: '1d',
      secret,
    });

    return { access_token: token };
  }
}
