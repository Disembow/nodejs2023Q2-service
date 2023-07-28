import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  getAllTracks() {
    return;
  }

  getTrack(id: string) {
    return id;
  }

  createTrack(createTrackDto: CreateTrackDto) {
    return createTrackDto;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    return updateTrackDto;
  }

  removeTrack(id: string) {
    return id;
  }
}
