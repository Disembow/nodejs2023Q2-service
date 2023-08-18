import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validateUuid } from '../utils/validateUuid';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getAllArtists() {
    return await this.prisma.artist.findMany();
  }

  async getArtist(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) throw new NotFoundException('Artist with such id not found');

    return artist;
  }

  async createArtist(dto: CreateArtistDto) {
    const newArtist = {
      id: uuid(),
      ...dto,
    };

    await this.prisma.artist.create({ data: newArtist });

    return newArtist;
  }

  async updateArtist(id: string, dto: UpdateArtistDto) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const artist = await this.getArtist(id);

    if (!artist) throw new NotFoundException('Artist with such id not found');

    const updatedArtist = {
      ...artist,
      ...dto,
    };

    await this.prisma.artist.update({ where: { id }, data: updatedArtist });

    return updatedArtist;
  }

  async removeArtist(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const artist = await this.getArtist(id);
    if (!artist) throw new NotFoundException('Artist with such id not found');

    await this.prisma.album.updateMany({
      where: { artistId: { equals: id } },
      data: { artistId: null },
    });

    await this.prisma.track.updateMany({
      where: { artistId: { equals: id } },
      data: { artistId: null },
    });

    return await this.prisma.artist.delete({ where: { id } });
  }
}
