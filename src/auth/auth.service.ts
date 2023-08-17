import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { compare } from 'bcrypt';
import { AuthTokens, IUser, PayloadType, SafetyUser } from './types/auth.types';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenAuthDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(authDto: CreateUserDto): Promise<SafetyUser> {
    return await this.userService.createUser(authDto);
  }

  async login(authDto: CreateUserDto): Promise<AuthTokens> {
    const { login, password } = authDto;

    const user = await this.prisma.user.findFirst({ where: { login } });

    if (!user)
      throw new ForbiddenException('User with such login does not exist');

    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword)
      throw new ForbiddenException('Password is incorrect');

    return await this.getJwt(user);
  }

  async refresh(refreshDto: RefreshTokenAuthDto) {
    const { refreshToken } = refreshDto;
    if (!refreshToken)
      throw new UnauthorizedException('Credentials are not valid');

    let payload: PayloadType;

    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
    } catch (error) {
      throw new ForbiddenException('Credentials are not valid');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) throw new ForbiddenException('Credentials are not valid');

    return await this.getJwt(user);
  }

  async getJwt(user: IUser): Promise<AuthTokens> {
    const { id, login } = user;

    return {
      accessToken: await this.jwtService.signAsync({ userId: id, login }),
      refreshToken: await this.jwtService.signAsync(
        { userId: id, login },
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        },
      ),
    };
  }

  buildUserResponse(user: IUser): SafetyUser {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, createdAt, updatedAt, ...rest } = user;

    return {
      ...rest,
      createdAt: Number(createdAt),
      updatedAt: Number(updatedAt),
    };
  }
}
