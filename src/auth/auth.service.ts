import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { compare } from 'bcrypt';
import { IUser, SafetyUser } from './types/user.interface';
import { JwtService } from '@nestjs/jwt';

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

  async login(
    authDto: CreateUserDto,
  ): Promise<SafetyUser & { accessToken: string }> {
    const { login, password } = authDto;

    const user = await this.prisma.user.findFirst({ where: { login } });

    if (!user)
      throw new ForbiddenException('User with such login does not exist');

    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword)
      throw new ForbiddenException('Password is incorrect');

    return {
      ...this.buildUserResponse(user),
      ...(await this.getJwt(user)),
    };
  }

  async refresh() {
    return;
  }

  async getJwt(user: IUser): Promise<{ accessToken: string }> {
    const { id, login } = user;

    return {
      accessToken: await this.jwtService.signAsync({ userId: id, login }),
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
