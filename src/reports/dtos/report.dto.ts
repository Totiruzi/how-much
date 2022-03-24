import { Expose, Transform } from 'class-transformer';
import { User } from '../../users/user.entity';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  madeYear: number;

  @Expose()
  soldPrice: number;

  @Expose()
  mileage: number;

  @Expose()
  lat: number;

  @Expose()
  lng: number;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;
}