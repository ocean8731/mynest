import { Exclude, Expose, Transform } from 'class-transformer';

// 값을 막아주는 Exclude
@Exclude()
export class Movie {
  // 막힌 값도 뚫어주는 Expose
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Transform(({ value }) => value.toString().toUpperCase())
  genre: string;
}
