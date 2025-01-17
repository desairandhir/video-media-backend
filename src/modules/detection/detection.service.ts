import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Detection } from './entities/detection.entity';
import { EmailService } from './email.service';
import { WinstonLoggerService } from 'src/logger/logger.service';

@Injectable()
export class DetectionService {
  private lastProcessedTimestamp: number | null = null;
  private readonly THROTTLE_WINDOW = 5 * 1000;

  constructor(
    @InjectRepository(Detection)
    private readonly detectionRepository: Repository<Detection>,
    private readonly emailService: EmailService,
    private readonly logger: WinstonLoggerService,
  ) {}

  private shouldProcessRequest(): boolean {
    const now = Date.now();

    if (!this.lastProcessedTimestamp) {
      return true;
    }

    const timeSinceLastProcessed = now - this.lastProcessedTimestamp;
    return timeSinceLastProcessed >= this.THROTTLE_WINDOW;
  }

  private updateLastProcessedTimestamp(): void {
    this.lastProcessedTimestamp = Date.now();
  }

  async createDetections(detectionData: {
    detected_objects: any[];
    detectedAt: string;
  }) {
    try {
      if (!this.shouldProcessRequest()) {
        return { message: 'Request ignored. Throttling in progress.' };
      }

      const detections = [];
      for (const obj of detectionData.detected_objects) {
        const detection = await this.create({
          objectName: obj.objectName,
          confidence: obj.confidence,
          detectedAt: new Date(detectionData.detectedAt),
        });
        detections.push(detection);
      }

      this.updateLastProcessedTimestamp();
      return detections;
    } catch (error) {
      this.logger.error(
        `Failed Detection service Fn-create: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  private async create(detectionData: Partial<Detection>): Promise<Detection> {
    try {
      const detection = this.detectionRepository.create(detectionData);
      const savedDetection = await this.detectionRepository.save(detection);

      if (this.isSuspiciousObject(detectionData.objectName)) {
        const subject = `Suspicious Object Detected: ${detectionData.objectName}`;
        const text = `A suspicious object (${detectionData.objectName}) was detected at ${new Date().toISOString()}.`;
        await this.sendAlertToAuthorities(subject, text);
      }

      return savedDetection;
    } catch (error) {
      this.logger.error(
        `Failed Detection service Fn-create: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  private isSuspiciousObject(objectName: string): boolean {
    try {
      const suspiciousObjects = ['knife', 'gun', 'crowbar', 'mask', 'bagpack'];
      return suspiciousObjects.includes(objectName);
    } catch (error) {
      this.logger.error(
        `Failed Detection service Fn-isSuspiciousObject: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  private async sendAlertToAuthorities(subject: string, text: string) {
    try {
      const authoritiesEmail = process.env.EMAIL_TO;
      await this.emailService.sendEmail(authoritiesEmail, subject, text);
    } catch (error) {
      this.logger.error(
        `Failed Detection service Fn-sendAlertToAuthorities: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.detectionRepository.find();
    } catch (error) {
      this.logger.error(
        `Failed Detection service Fn-findAll: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
