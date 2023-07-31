import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { db } from '../database/db';
import { validateUuid } from '../utils/validateUuid';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TrackService {
  getAllTracks() {
    return db.tracks;
  }

  getTrack(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const track = db.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException('Track with such id not found');

    return track;
  }

  createTrack(createTrackDto: CreateTrackDto) {
    if (!createTrackDto.name || !createTrackDto.duration) {
      throw new BadRequestException('Missing required fields in input data ');
    }

    const newTrack = {
      id: uuid(),
      ...createTrackDto,
    };

    db.tracks.push(newTrack);

    return newTrack;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const track = this.getTrack(id);
    const index = db.tracks.findIndex((track) => track.id === id);

    if (!track) throw new NotFoundException('Track with such id not found');

    const updatedTrack = {
      ...track,
      ...updateTrackDto,
    };

    db.tracks[index] = updatedTrack;

    return updatedTrack;
  }

  removeTrack(id: string) {
    if (!validateUuid(id)) throw new BadRequestException('Entered invalid id');

    const track = this.getTrack(id);
    if (!track) throw new NotFoundException('Track with such id not found');

    db.tracks = db.tracks.filter((track) => track.id !== id);

    return track;
  }
}
