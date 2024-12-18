import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { errorCodesWithMsg } from 'src/constants/app.constant';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user', maxLength: 50 })
  @IsString({ message: errorCodesWithMsg.DOCERPERROR023 })
  @Length(1, 50, { message: errorCodesWithMsg.DOCERPERROR040 })
  username: string;

  @ApiProperty({ description: 'The password of the user', maxLength: 255 })
  @IsString({ message: errorCodesWithMsg.DOCERPERROR024 })
  @Length(1, 255, { message: errorCodesWithMsg.DOCERPERROR041 })
  password: string;

  @ApiProperty({ description: 'The email id of the user', maxLength: 100 })
  @IsString({ message: errorCodesWithMsg.DOCERPERROR025 })
  @Length(1, 100, { message: errorCodesWithMsg.DOCERPERROR042 })
  email: string;

  @ApiProperty({ description: 'The contact number of the user' })
  @IsNotEmpty({ message: errorCodesWithMsg.DOCERPERROR022 })
  @IsNumber({}, { message: errorCodesWithMsg.DOCERPERROR043 })
  contact: number;

  @ApiProperty({ description: 'The role of the user', maxLength: 50 })
  @IsString({ message: errorCodesWithMsg.DOCERPERROR026 })
  @Length(1, 50, { message: errorCodesWithMsg.DOCERPERROR044 })
  role: string;
}
