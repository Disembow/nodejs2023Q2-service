import { Injectable } from '@nestjs/common';
import { db } from '../database/db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  getAllArtists() {
    return db.artists;
  }

  getArtist(id: string) {
    return id;
  }

  createArtist(dto: CreateArtistDto) {
    return dto;
  }

  updateArtist(id: string, dto: UpdateArtistDto) {
    return { id, dto };
  }

  removeArtist(id: string) {
    return id;
  }
}
