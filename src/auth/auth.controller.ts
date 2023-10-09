import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RefreshTokenAuthDto } from './dto/refresh-token.dto';
import { AllowAnon } from './decorators/allowAnon.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AllowAnon()
  @Post('signup')
  @HttpCode(201)
  async signup(@Body() authDto: CreateUserDto) {
    return await this.authService.signup(authDto);
  }

  @AllowAnon()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authDto: CreateUserDto) {
    return await this.authService.login(authDto);
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() refreshDto: RefreshTokenAuthDto) {
    return await this.authService.refresh(refreshDto);
  }
}
