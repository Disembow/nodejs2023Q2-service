import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { db } from '../database/db';
import { v4 as uuid } from 'uuid';
import { validateUuid } from '../utils/validateUuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAllAlbums() {
    return await this.prisma.album.findMany();
  }

  async getAlbum(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) throw new NotFoundException('Album with such id not found');

    return album;
  }

  async createAlbum(dto: CreateAlbumDto) {
    const newTAlbum = {
      id: uuid(),
      ...dto,
    };

    await this.prisma.album.create({ data: newTAlbum });

    return newTAlbum;
  }

  async updateAlbum(id: string, dto: UpdateAlbumDto) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const album = await this.getAlbum(id);
    // const index = db.albums.findIndex((a) => a.id === id);

    if (!album) throw new NotFoundException('Album with such id not found');

    const updatedAlbum = {
      ...album,
      ...dto,
    };

    await this.prisma.album.update({ where: { id }, data: updatedAlbum });

    return updatedAlbum;
  }

  async removeAlbum(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const album = await this.getAlbum(id);

    if (!album) throw new NotFoundException('Album with such id not found');

    // TODO: add logic of deleting from favorites after deleting
    // db.tracks.map((t) => (t.albumId === id ? (t.albumId = null) : ''));

    // db.albums = db.albums.filter((a) => a.id !== id);
    await this.prisma.album.delete({ where: { id } });

    // TODO: add logic of deleting from favorites after deleting
    // db.favorites.albums = db.favorites.albums.filter((a) => a.id !== id);

    return album;
  }
}
