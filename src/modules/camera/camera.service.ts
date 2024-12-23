import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Helper function to safely stringify objects and avoid circular references
const safeStringify = (obj: any) => {
  try {
    return JSON.stringify(obj, (key, value) => {
      if (key === 'socket' || key === 'parser') {
        return undefined; // remove circular reference keys
      }
      return value;
    });
  } catch (error) {
    console.error('Error stringifying object:', error);
    return '{}'; // Return an empty object on error
  }
};

@Injectable()
export class CameraService {
  async processVideo(file: Express.Multer.File, res: Response): Promise<any> {
    if (!file) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'No video file provided' });
    }

    const videoPath = path.join(uploadDir, file.filename);

    try {
      // Log the uploaded file to see its contents
      console.log('Uploaded file:', file);

      // Call Python script
      const result = await new Promise((resolve, reject) => {
        const pythonProcess = spawn('python3', [
          'python-scripts/process_video.py',
          videoPath,
        ]);

        let output = '';
        pythonProcess.stdout.on('data', (data) => {
          output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
          console.error(`Python error: ${data.toString()}`);
        });
        pythonProcess.on('close', (code) => {
          if (code !== 0) {
            reject(new Error('Python script failed.'));
          } else {
            // Safely stringify the output from the Python script
            const safeResult = safeStringify(JSON.parse(output));
            resolve(safeResult);
          }
        });
      });

      return res.status(HttpStatus.OK).json({
        message: 'Video processed successfully',
        data: result,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error processing video',
        error: error.message,
      });
    } finally {
      // Optionally delete the uploaded video after processing
      fs.unlink(videoPath, (err) => {
        if (err) console.error(`Failed to delete file: ${videoPath}`);
      });
    }
  }
}
