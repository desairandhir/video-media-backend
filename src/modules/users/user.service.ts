import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

import { errorCodes } from 'src/constants/app.constant';
import { WinstonLoggerService } from 'src/logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly logger: WinstonLoggerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const checkEmail = await this.findOneWithEmail(createUserDto.email);
      if (!checkEmail) {
        const { password, ...otherUserData } = createUserDto;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userRepository.create({
          ...otherUserData,
          password: hashedPassword,
        });
        await this.userRepository.save(user);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...result } = user;
        return result;
      } else {
        throw new HttpException(
          `${errorCodes.BACKENDERROR027}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      this.logger.error(
        `${errorCodes.BACKENDERROR012}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      this.logger.error(
        `${errorCodes.BACKENDERROR013}: ${error.message}`,
        error.stack,
      );
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new HttpException(
          errorCodes.BACKENDERROR017,
          HttpStatus.BAD_REQUEST,
        );
      }
      return user;
    } catch (error) {
      this.logger.error(
        `${errorCodes.BACKENDERROR014}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new HttpException(
          errorCodes.BACKENDERROR017,
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.userRepository.delete(id);
    } catch (error) {
      this.logger.error(
        `${errorCodes.BACKENDERROR015}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async update(id: string, newData: Partial<User>) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new HttpException(
          errorCodes.BACKENDERROR017,
          HttpStatus.BAD_REQUEST,
        );
      }
      if (newData.password) {
        newData.password = await bcrypt.hash(newData.password, 10);
      }
      Object.assign(user, newData);
      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.error(
        `${errorCodes.BACKENDERROR016}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findOneWithEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      return user || null;
    } catch (error) {
      this.logger.error(
        `${errorCodes.BACKENDERROR069}: ${error.message}`,
        error.stack,
      );
    }
  }
}
