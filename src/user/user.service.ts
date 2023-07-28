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

@Injectable()
export class UserService {
  private users: {
    id: string;
    login: string;
    password: string;
    version: number;
    createdAt: number;
    updatedAt: number;
  }[] = [
    {
      id: '1ca52c3c-e18e-4135-b004-40bbb62efccb',
      login: 'Jackson',
      password: '123456',
      version: 1,
      createdAt: Number(new Date()),
      updatedAt: Number(new Date()),
    },
    {
      id: '71d24b57-a419-4007-9c44-4c2fdc7297eb',
      login: 'Foxbat',
      password: 'qwerty',
      version: 4,
      createdAt: Number(new Date()),
      updatedAt: Number(new Date()),
    },
  ];

  getUsers() {
    return this.users;
  }

  getUser(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const user = this.users.find((user) => user.id === id);
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

    this.users.push(newUser);

    delete newUser.password;
    return newUser;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const user = this.getUser(id);
    const index = this.users.findIndex((user) => user.id === id);

    if (!user) throw new NotFoundException('User with such id not found');

    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const updatedUser = {
      ...user,
      password: updateUserDto.newPassword,
      version: user.version + 1,
      updatedAt: Number(new Date()),
    };

    this.users[index] = updatedUser;

    delete updatedUser.password;
    return updatedUser;
  }

  removeUser(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const user = this.getUser(id);
    if (!user) throw new NotFoundException('User with such id not found');

    this.users = this.users.filter((user) => user.id !== id);

    return user;
  }
}
