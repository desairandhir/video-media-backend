import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateDetectionDto {
  @ApiProperty({ description: 'The name of the detected object' })
  @IsString()
  objectName: string;

  @ApiProperty({ description: 'The confidence score of the detection' })
  @IsNumber()
  confidence: number;

  @ApiProperty({ description: 'The timestamp when the object was detected' })
  @IsString()
  detectedAt: string;
}
