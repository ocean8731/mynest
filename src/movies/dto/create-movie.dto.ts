import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty() // message : genre should be no empty
  genre: string;
}
