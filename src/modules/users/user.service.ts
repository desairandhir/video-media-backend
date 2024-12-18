// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import * as bcrypt from 'bcrypt';
// import { User } from './entities/user.entity';
// import { CreateUserDto } from './dto/create-user.dto';
// import { logger } from 'src/configs/winston.config';
// import { errorCodesWithMsg } from 'src/constants/app.constant';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//   ) {}

//   async create(createUserDto: CreateUserDto) {
//     const { password, ...otherUserData } = createUserDto;
//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = await this.userRepository.create({
//         ...otherUserData,
//         password: hashedPassword,
//       });
//       await this.userRepository.save(user);
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       const { password: _, ...result } = user;
//       return result;
//     } catch (error) {
//       logger.error(`${errorCodesWithMsg.DOCERPERROR012}: ${error.message}`);
//       throw error;
//     }
//   }

//   async findAll() {
//     try {
//       return await this.userRepository.find();
//     } catch (error) {
//       logger.error(`${errorCodesWithMsg.DOCERPERROR013}: ${error.message}`);
//     }
//   }

//   async findOne(id: string) {
//     try {
//       const user = await this.userRepository.findOneBy({ id });
//       if (!user) {
//         throw new HttpException(
//           errorCodesWithMsg.DOCERPERROR017,
//           HttpStatus.BAD_REQUEST,
//         );
//       }
//       return user;
//     } catch (error) {
//       logger.error(`${errorCodesWithMsg.DOCERPERROR014}: ${error.message}`);
//       throw error;
//     }
//   }

//   async remove(id: string) {
//     try {
//       const user = await this.userRepository.findOneBy({ id });
//       if (!user) {
//         throw new HttpException(
//           errorCodesWithMsg.DOCERPERROR017,
//           HttpStatus.BAD_REQUEST,
//         );
//       }
//       await this.userRepository.delete(id);
//     } catch (error) {
//       logger.error(`${errorCodesWithMsg.DOCERPERROR015}: ${error.message}`);
//       throw error;
//     }
//   }

//   async update(id: string, newData: Partial<User>) {
//     try {
//       const user = await this.userRepository.findOneBy({ id });
//       if (!user) {
//         throw new HttpException(
//           errorCodesWithMsg.DOCERPERROR017,
//           HttpStatus.BAD_REQUEST,
//         );
//       }
//       if (newData.password) {
//         newData.password = await bcrypt.hash(newData.password, 10);
//       }
//       Object.assign(user, newData);
//       return await this.userRepository.save(user);
//     } catch (error) {
//       logger.error(`${errorCodesWithMsg.DOCERPERROR016}: ${error.message}`);
//       throw error;
//     }
//   }

//   async findOneWithUserName(username: string) {
//     return await this.userRepository.findOne({ where: { username: username } });
//   }
// }
