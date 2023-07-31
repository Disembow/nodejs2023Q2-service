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
import { db } from '../database/db';

@Injectable()
export class UserService {
  getUsers() {
    return db.users;
  }

  getUser(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const user = db.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User with such id not found');

    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = {
      id: uuid(),
      ...createUserDto,
      version: 1,
      createdAt: Number(new Date()),
      updatedAt: Number(new Date()),
    };

    db.users.push(newUser);

    const { password, ...rest } = newUser;
    return rest;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const user = db.users.find((user) => user.id === id);
    const index = db.users.findIndex((user) => user.id === id);

    if (!user) throw new NotFoundException('User with such id not found');

    const { newPassword, oldPassword } = updateUserDto;

    if (oldPassword !== user.password) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const updatedUser = {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: Number(new Date()),
    };

    db.users[index] = updatedUser;
    const { password, ...rest } = updatedUser;

    return rest;
  }

  removeUser(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const user = this.getUser(id);
    if (!user) throw new NotFoundException('User with such id not found');

    db.users = db.users.filter((user) => user.id !== id);

    return user;
  }
}
