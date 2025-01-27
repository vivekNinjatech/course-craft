import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async register(dto: RegisterDto, isAdmin: boolean) {
    try {
      if (dto.role === AuthRole.SUPERADMIN) {
        const isSuperAdminExists = await this.prisma.user.findFirst({
          where: { role: AuthRole.SUPERADMIN },
        });
        if (isSuperAdminExists) {
          throw new ConflictException('Super admin already exists');
        }
      } else if (dto.role !== AuthRole.USER && !isAdmin) {
        throw new ForbiddenException('Only USER can be created');
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
          throw new ConflictException('Credentials already taken');
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
      throw new NotFoundException('User not found');
    }

    const isCorrectPassword = await argon.verify(user.password, dto.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Credentials incorrect');
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
