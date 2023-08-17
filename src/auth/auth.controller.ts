import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RefreshTokenAuthDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() authDto: CreateUserDto) {
    return await this.authService.signup(authDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() authDto: CreateUserDto) {
    return await this.authService.login(authDto);
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() refreshDto: RefreshTokenAuthDto) {
    return await this.authService.refresh(refreshDto);
  }
}
