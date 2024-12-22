import { Injectable } from '@nestjs/common';

@Injectable()
export class CameraService {
  async getCamera() {
    return 'Camera';
  }
}
