import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'The username of the user', maxLength: 50 })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    maxLength: 255,
  })
  @IsString()
  @Length(1, 255)
  password: string;
}
