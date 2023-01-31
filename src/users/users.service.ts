import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user: User = await this.usersRepository.findOneBy({ userId: id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user: User = await this.findOne(id);
    user = {
      ...user,
      ...updateUserDto,
    };
    return await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user: User = await this.findOne(id);
    return await this.usersRepository.remove(user);
  }
}
