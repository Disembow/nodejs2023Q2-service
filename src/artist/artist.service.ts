import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { db } from '../database/db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validateUuid } from '../utils/validateUuid';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ArtistService {
  getAllArtists() {
    return db.artists;
  }

  getArtist(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const artist = db.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException('Artist with such id not found');

    return artist;
  }

  createArtist(dto: CreateArtistDto) {
    const newArtist = {
      id: uuid(),
      ...dto,
    };

    db.artists.push(newArtist);

    return newArtist;
  }

  updateArtist(id: string, dto: UpdateArtistDto) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const artist = this.getArtist(id);
    const index = db.tracks.findIndex((artist) => artist.id === id);

    if (!artist) throw new NotFoundException('Artist with such id not found');

    const updatedArtist = {
      ...artist,
      ...dto,
    };

    db.artists[index] = updatedArtist;

    return updatedArtist;
  }

  removeArtist(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const artist = this.getArtist(id);
    if (!artist) throw new NotFoundException('Artist with such id not found');

    db.tracks.map((track) =>
      track.artistId === id ? (track.artistId = null) : '',
    );
    db.albums.map((album) =>
      album.artistId === id ? (album.artistId = null) : '',
    );

    db.artists = db.artists.filter((artist) => artist.id !== id);

    return artist;
  }
}
