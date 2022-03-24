import { Transform } from 'class-transformer';
import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class GetEstimateDto {
  // API properties

  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;
  
  @Transform(({value}) => parseInt(value))
  @IsNumber()
  @Min(1900)
  @Max(2030)
  madeYear: number;

  @Transform(({value}) => parseInt(value))
  @IsNumber()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @Transform(({value}) => parseFloat(value))
  @IsLatitude()
  @IsNotEmpty()
  lat: number;

  @Transform(({value}) => parseFloat(value))
  @IsLongitude()
  @IsNotEmpty()
  lng: number;
}
