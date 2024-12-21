import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { errorCodes } from 'src/constants/app.constant';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user', maxLength: 50 })
  @IsString({ message: errorCodes.BACKENDERROR023 })
  @Length(1, 50, { message: errorCodes.BACKENDERROR040 })
  username: string;

  @ApiProperty({ description: 'The password of the user', maxLength: 255 })
  @IsString({ message: errorCodes.BACKENDERROR024 })
  @Length(1, 255, { message: errorCodes.BACKENDERROR041 })
  password: string;

  @ApiProperty({ description: 'The email id of the user', maxLength: 100 })
  @IsString({ message: errorCodes.BACKENDERROR025 })
  @Length(1, 100, { message: errorCodes.BACKENDERROR042 })
  email: string;

  @ApiProperty({ description: 'The contact number of the user' })
  @IsNotEmpty({ message: errorCodes.BACKENDERROR022 })
  @IsNumber({}, { message: errorCodes.BACKENDERROR043 })
  contact: number;

  @ApiProperty({ description: 'The role of the user', maxLength: 50 })
  @IsString({ message: errorCodes.BACKENDERROR026 })
  @Length(1, 50, { message: errorCodes.BACKENDERROR044 })
  role: string;
}
