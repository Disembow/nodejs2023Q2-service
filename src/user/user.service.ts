import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validateUuid } from '../utils/validateUuid';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async getUser(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User with such id does not found');
    } else {
      return user;
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = {
      id: uuid(),
      version: 1,
      ...createUserDto,
    };

    const user = await this.prisma.user.create({ data: newUser });

    const { id, login, version, createdAt, updatedAt } = user;

    const userToReturn = {
      id,
      login,
      version,
      createdAt: createdAt.getTime(),
      updatedAt: updatedAt.getTime(),
    };

    return userToReturn;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const { login, createdAt, version, password } = await this.getUser(id);

    if (!login) throw new NotFoundException('User with such id not found');

    const { newPassword, oldPassword } = updateUserDto;

    if (oldPassword !== password) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const updatedUser = {
      id,
      login,
      createdAt,
      password: newPassword,
      version: version + 1,
    };

    const { password: pass, ...rest } = await this.prisma.user.update({
      where: { id },
      data: updatedUser,
    });

    return {
      ...rest,
      createdAt: Number(rest.createdAt),
      updatedAt: Number(rest.updatedAt),
    };
  }

  async removeUser(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const user = await this.getUser(id);

    if (!user) throw new NotFoundException('User with such id not found');

    await this.prisma.user.delete({ where: { id } });

    return user;
  }
}
