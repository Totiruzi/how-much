import { IsString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  soldPrice: number;
}
