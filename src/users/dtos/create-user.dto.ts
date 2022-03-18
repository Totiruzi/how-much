import { IsEmail, IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  // @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

