import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>) {
    const getUser = await this.userRepository.create(user);
    await this.userRepository.save(getUser);
    const { password, ...result } = getUser;
    console.log('password', password);
    return result;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneWithUserName(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  update(id: string, updateUser: Partial<User>) {
    return this.userRepository.update(id, updateUser);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
