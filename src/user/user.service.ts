import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  private readonly logger = new Logger(UserService.name);
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async registerUser(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    this.logger.log(`Creating user: ${user.name}`);
    return this.userRepository.save(user);
  }

  async loginUser(email: any, password: any) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        this.logger.error(`User with email ${email} not found.`);
        return null;
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        this.logger.warn(`Invalid password for user ${user.email}.`);
        return null;
      }
      this.logger.log(`Login successful for user ${user.email}.`);
      return user;
    } catch (error) {
      this.logger.error(error.message);
      throw error; 
    }
  }
}
