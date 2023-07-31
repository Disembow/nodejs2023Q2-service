import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { db } from '../database/db';
import { validateUuid } from '../utils/validateUuid';

@Injectable()
export class FavoritesService {
  getFavorites() {
    const response = {
      albums: [],
      artists: [],
      tracks: [],
    };

    db.favorites.albums.map((id) => {
      const album = db.albums.find((a) => a.id === id);
      if (album) response.albums.push(album);
    });

    db.favorites.artists.map((id) => {
      const artist = db.artists.find((a) => a.id === id);
      if (artist) response.artists.push(artist);
    });

    db.favorites.tracks.map((id) => {
      const track = db.tracks.find((t) => t.id === id);
      if (track) response.tracks.push(track);
    });

    return response;
  }

  setAlbumToFavorites(id: string) {
    if (!validateUuid(id)) throw new BadRequestException();

    const album = db.albums.find((a) => a.id === id);
    if (!album) throw new UnprocessableEntityException();

    db.favorites.albums.push(id);
  }

  setArtistToFavorites(id: string) {
    if (!validateUuid(id)) throw new BadRequestException();

    const artist = db.artists.find((a) => a.id === id);
    if (!artist) throw new UnprocessableEntityException();

    db.favorites.artists.push(id);
  }

  setTrackToFavorites(id: string) {
    if (!validateUuid(id)) throw new BadRequestException();

    const track = db.tracks.find((a) => a.id === id);
    if (!track) throw new UnprocessableEntityException();

    db.favorites.tracks.push(id);
  }

  removeAlbumFromFavorites(id: string) {
    if (!validateUuid(id)) throw new BadRequestException();

    const index = db.favorites.albums.indexOf(id);

    if (!index) {
      throw new NotFoundException(
        'Album with such id was not added to favorites',
      );
    } else {
      db.favorites.albums.splice(index, 1);
    }
  }

  removeArtistFromFavorites(id: string) {
    if (!validateUuid(id)) throw new BadRequestException();

    const index = db.favorites.artists.indexOf(id);

    if (!index) {
      throw new NotFoundException(
        'Artist with such id was not added to favorites',
      );
    } else {
      db.favorites.artists.splice(index, 1);
    }
  }

  removeTrackFromFavorites(id: string) {
    if (!validateUuid(id)) throw new BadRequestException();

    const index = db.favorites.tracks.indexOf(id);

    if (!index) {
      throw new NotFoundException(
        'Track with such id was not added to favorites',
      );
    } else {
      db.favorites.tracks.splice(index, 1);
    }
  }
}
