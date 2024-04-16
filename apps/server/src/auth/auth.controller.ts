import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { GoogleStrategy } from './strategies/google.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly googleStrategy: GoogleStrategy) {}

  @Get('/google/url')
  async googleUrl() {
    const url = await this.googleStrategy.getAuthUrl();
    return { authUrl: url };
  }

  @Post('/google/login')
  async googleLogin(@Body() data: any) {
    return await this.googleStrategy.logIn({
      code: data.code,
    });
  }

  @Get('me')
  async getMe(@Req() req: Request) {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader.split(' ')[1];
    console.log({ accessToken });

    const user = await this.googleStrategy.getUser(accessToken);
    return user;
  }
}
