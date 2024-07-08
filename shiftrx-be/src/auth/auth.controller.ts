import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AccessToken, RequestWithUser } from './types/auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() user: UserDto): Promise<AccessToken> {
    return await this.authService.signup(user);
  }

  @Post('login')
  async login(@Body() user: UserDto): Promise<AccessToken> {
    return this.authService.login(user.username, user.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(
    @Req() req: RequestWithUser,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.authService.get({ id: req.user.userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...profile } = user;
    return profile;
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate')
  async validateToken(): Promise<{ message: string }> {
    return { message: 'Token is valid' };
  }
}
