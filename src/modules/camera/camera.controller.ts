import { Controller, Post, Body, Res } from '@nestjs/common';
import { CameraService } from './camera.service';
import { Response } from 'express';

@Controller('camera')
export class CameraController {
  constructor(private readonly cameraService: CameraService) {}

  @Post('upload')
  async uploadVideo(
    @Body('video') video: Express.Multer.File,
    @Res() res: Response,
  ) {
    return this.cameraService.processVideo(video, res);
  }
}
