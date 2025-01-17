import { Controller, Post, Body, Get } from '@nestjs/common';
import { DetectionService } from './detection.service';

@Controller('detection')
export class DetectionController {
  constructor(private readonly detectionService: DetectionService) {}

  @Post()
  create(
    @Body() detectionData: { detected_objects: any[]; detectedAt: string },
  ) {
    return this.detectionService.createDetections(detectionData);
  }

  @Get()
  findAll() {
    return this.detectionService.findAll();
  }
}
