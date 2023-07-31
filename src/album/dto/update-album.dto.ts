import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  artistId: string | null;
}
