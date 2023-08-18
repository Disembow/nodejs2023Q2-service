import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { validateUuid } from '../utils/validateUuid';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getFavorites() {
    const favorites = await this.prisma.favorites.findFirst();

    if (!favorites) return { albums: [], artists: [], tracks: [] };

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

    const response = {
      albums: albums.filter((e) => e !== null),
      artists: artists.filter((e) => e !== null),
      tracks: tracks.filter((e) => e !== null),
    };

    return response;
  }

  async setAlbumToFavorites(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Invalid album Id');

    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album)
      throw new UnprocessableEntityException('Album with such Id not found');

    const favorites = await this.prisma.favorites.findFirst();

    const emptyFavorites = {
      albums: [],
      artists: [],
      tracks: [],
      favId: uuid(),
    };

    if (!favorites)
      await this.prisma.favorites.create({ data: emptyFavorites });

    const favId = favorites ? favorites.favId : emptyFavorites.favId;
    const albums = favorites?.albums || [];
    albums.push(id);

    await this.prisma.favorites.update({
      where: { favId },
      data: { ...favorites, albums },
    });
  }

  async setArtistToFavorites(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Invalid artist Id');

    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist)
      throw new UnprocessableEntityException('Artist with such Id not found');

    const favorites = await this.prisma.favorites.findFirst();

    const emptyFavorites = {
      albums: [],
      artists: [],
      tracks: [],
      favId: uuid(),
    };

    if (!favorites)
      await this.prisma.favorites.create({ data: emptyFavorites });

    const favId = favorites ? favorites.favId : emptyFavorites.favId;
    const artists = favorites?.artists || [];
    artists.push(id);

    await this.prisma.favorites.update({
      where: { favId },
      data: { ...favorites, artists },
    });
  }

  async setTrackToFavorites(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Invalid track Id');

    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track)
      throw new UnprocessableEntityException('Track with such Id not found');

    const favorites = await this.prisma.favorites.findFirst();

    const emptyFavorites = {
      albums: [],
      artists: [],
      tracks: [],
      favId: uuid(),
    };

    if (!favorites)
      await this.prisma.favorites.create({ data: emptyFavorites });

    const favId = favorites ? favorites.favId : emptyFavorites.favId;
    const tracks = favorites?.tracks || [];
    tracks.push(id);

    await this.prisma.favorites.update({
      where: { favId },
      data: { ...favorites, tracks },
    });
  }

  async removeAlbumFromFavorites(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Invalid album Id');

    const favorites = await this.prisma.favorites.findFirst();

    const isAlbumInFavorites = favorites?.albums.find((t) => t === id);
    if (!isAlbumInFavorites)
      throw new NotFoundException("Album with such Id isn't in favorites");

    const remainingAlbums = favorites?.albums.filter((a) => a !== id);

    const responce = await this.prisma.favorites.update({
      where: { favId: favorites.favId },
      data: { ...favorites, albums: remainingAlbums },
    });

    return responce;
  }

  async removeArtistFromFavorites(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Invalid artist Id');

    const favorites = await this.prisma.favorites.findFirst();

    const isArtistInFavorites = favorites?.artists.find((t) => t === id);
    if (!isArtistInFavorites)
      throw new NotFoundException("Artist with such Id isn't in favorites");

    const remainingArtists = favorites?.artists.filter((a) => a !== id);

    return await this.prisma.favorites.update({
      where: { favId: favorites.favId },
      data: { ...favorites, artists: remainingArtists },
    });
  }

  async removeTrackFromFavorites(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Invalid track Id');

    const favorites = await this.prisma.favorites.findFirst();

    const isTrackInFavorites = favorites?.tracks.find((t) => t === id);
    if (!isTrackInFavorites)
      throw new NotFoundException("Track with such Id isn't in favorites");

    const remainingTracks = favorites?.tracks.filter((t) => t !== id);

    return await this.prisma.favorites.update({
      where: { favId: favorites.favId },
      data: { ...favorites, tracks: remainingTracks },
    });
  }
}
