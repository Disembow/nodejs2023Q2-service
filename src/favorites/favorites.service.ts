import {
  BadRequestException,
  Injectable,
  // NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { validateUuid } from '../utils/validateUuid';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  emptyResponse = {
    albums: [],
    artists: [],
    tracks: [],
    favId: uuid(),
  };

  async getFavorites() {
    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) return this.emptyResponse;

    const albums = await Promise.all(
      favorites.albums.map(async (albumId) => {
        return await this.prisma.album.findUnique({ where: { id: albumId } });
      }),
    );

    const artists = await Promise.all(
      favorites.artists.map(async (artistId) => {
        return await this.prisma.artist.findUnique({ where: { id: artistId } });
      }),
    );

    const tracks = await Promise.all(
      favorites.tracks.map(async (trackId) => {
        return await this.prisma.track.findUnique({ where: { id: trackId } });
      }),
    );

    console.log({
      albums: [...albums],
      artists: [...artists],
      tracks: [...tracks],
    });

    return {
      albums: [...albums],
      artists: [...artists],
      tracks: [...tracks],
    };
  }

  async setAlbumToFavorites(id: string) {
    if (!validateUuid(id)) throw new BadRequestException();

    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) throw new UnprocessableEntityException();

    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      await this.prisma.favorites.create({ data: this.emptyResponse });
    } else {
      favorites.albums.push(id);

      await this.prisma.favorites.update({
        where: { favId: favorites.favId },
        data: favorites,
      });
    }
  }

  async setArtistToFavorites(id: string) {
    if (!validateUuid(id)) throw new BadRequestException();

    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) throw new UnprocessableEntityException();

    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      await this.prisma.favorites.create({ data: this.emptyResponse });
    } else {
      favorites.artists.push(id);

      await this.prisma.favorites.update({
        where: { favId: favorites.favId },
        data: favorites,
      });
    }
  }

  async setTrackToFavorites(id: string) {
    if (!validateUuid(id)) throw new BadRequestException();

    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) throw new UnprocessableEntityException();

    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) {
      await this.prisma.favorites.create({ data: this.emptyResponse });
    } else {
      favorites.tracks.push(id);

      await this.prisma.favorites.update({
        where: { favId: favorites.favId },
        data: favorites,
      });
    }
  }

  async removeAlbumFromFavorites(id: string) {
    if (!validateUuid(id)) throw new BadRequestException();

    const favorites = await this.prisma.favorites.findFirst();
    // const albumId = favorites.albums.find((a) => a === id);

    // if (!albumId) {
    //   throw new NotFoundException(
    //     'Album with such id was not added to favorites',
    //   );
    // } else {
    const remainingAlbums = favorites.albums.filter((a) => a !== id);

    return await this.prisma.favorites.update({
      where: { favId: favorites.favId },
      data: { ...favorites, albums: remainingAlbums },
    });
    // }
  }

  async removeArtistFromFavorites(id: string) {
    if (!validateUuid(id)) throw new BadRequestException();

    const favorites = await this.prisma.favorites.findFirst();
    // const artistId = favorites.artists.find((a) => a === id);

    // if (!artistId) {
    //   throw new NotFoundException(
    //     'Artist with such id was not added to favorites',
    //   );
    // } else {
    const remainingArtists = favorites.artists.filter((a) => a !== id);

    return await this.prisma.favorites.update({
      where: { favId: favorites.favId },
      data: { ...favorites, artists: remainingArtists },
    });
    // }
  }

  async removeTrackFromFavorites(id: string) {
    if (!validateUuid(id)) throw new BadRequestException();

    const favorites = await this.prisma.favorites.findFirst();
    // const trackId = favorites.tracks.find((t) => t === id);

    // if (!trackId) {
    //   throw new NotFoundException(
    //     'Track with such id was not added to favorites',
    //   );
    // } else {
    const remainingTracks = favorites.tracks.filter((t) => t !== id);

    return await this.prisma.favorites.update({
      where: { favId: favorites.favId },
      data: { ...favorites, tracks: remainingTracks },
    });
    // }
  }
}
