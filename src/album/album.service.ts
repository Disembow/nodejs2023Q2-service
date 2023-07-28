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

@Injectable()
export class AlbumService {
  getAllAlbums() {
    return db.albums;
  }

  getAlbum(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const album = db.albums.find((a) => a.id === id);
    if (!album) throw new NotFoundException('Album with such id not found');

    return album;
  }

  createAlbum(dto: CreateAlbumDto) {
    const newTAlbum = {
      id: uuid(),
      ...dto,
    };

    db.albums.push(newTAlbum);

    return newTAlbum;
  }

  updateAlbum(id: string, dto: UpdateAlbumDto) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const album = this.getAlbum(id);
    const index = db.albums.findIndex((a) => a.id === id);

    if (!album) throw new NotFoundException('Album with such id not found');

    const updatedAlbum = {
      ...album,
      ...dto,
    };

    db.albums[index] = updatedAlbum;

    return updatedAlbum;
  }

  removeAlbum(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const album = this.getAlbum(id);
    if (!album) throw new NotFoundException('Album with such id not found');

    db.tracks.map((t) => (t.albumId === id ? (t.albumId = null) : ''));

    db.albums = db.albums.filter((a) => a.id !== id);

    return album;
  }
}
