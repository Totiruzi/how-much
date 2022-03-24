import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReportDto {
  // API properties

  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;
  
  @IsNumber()
  @Min(1900)
  @Max(2030)
  madeYear: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(1000000)
  soldPrice: number;

  @IsNumber()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @IsLatitude()
  @IsNotEmpty()
  lat: number;

  @IsLongitude()
  @IsNotEmpty()
  lng: number;
}
