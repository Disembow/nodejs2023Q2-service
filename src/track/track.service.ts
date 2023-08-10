import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validateUuid } from '../utils/validateUuid';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async getAllTracks() {
    return await this.prisma.track.findMany();
  }

  async getTrack(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException('Track with such id not found');
    } else {
      return track;
    }
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    if (!createTrackDto.name || !createTrackDto.duration) {
      throw new BadRequestException('Missing required fields in input data ');
    }

    const newTrack = {
      id: uuid(),
      ...createTrackDto,
    };

    await this.prisma.track.create({ data: newTrack });

    return newTrack;
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const track = await this.getTrack(id);

    if (!track) throw new NotFoundException('Track with such id not found');

    const updatedTrack = {
      ...track,
      ...updateTrackDto,
    };

    await this.prisma.track.update({
      where: { id },
      data: updatedTrack,
    });

    return updatedTrack;
  }

  async removeTrack(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const track = await this.getTrack(id);

    if (!track) throw new NotFoundException('Track with such id not found');

    // TODO: add logic of deleting from favorites after deleting
    await this.prisma.track.delete({ where: { id } });

    return track;
  }
}
