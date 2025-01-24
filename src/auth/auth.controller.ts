import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { AuthService } from './auth.service';
import { AuthRole } from './type';
import { JwtGuard } from './guard';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(201)
  @Post('register')
  @UseGuards(JwtGuard)
  async register(@Body() registerDto: RegisterDto, @Req() req: any) {
    let callerRole: AuthRole;
    console.log(req.user);
    if(req.user){
      callerRole = req.user.role;
    }
    return this.authService.register(registerDto, callerRole);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
