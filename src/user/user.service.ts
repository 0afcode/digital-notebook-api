import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userInfo: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create(userInfo);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async find(searchParams: Partial<User>): Promise<User[]> {
    const newSearchParams = { ...searchParams } as Partial<
      Record<keyof User, any>
    >;

    if (searchParams.firstName) {
      newSearchParams.firstName = Like(`%${searchParams.firstName}%`);
    }
    if (searchParams.lastName) {
      newSearchParams.lastName = Like(`%${searchParams.lastName}%`);
    }
    return this.userRepository.find({
      where: newSearchParams as FindOptionsWhere<User>,
    });
  }

  async update(id: string, userInfo: UpdateUserDTO): Promise<User | null> {
    const userExists = await this.findOne(id);
    if (userExists) {
      await this.userRepository.update(id, userInfo);
      return this.findOne(id);
    }
    return null;
  }

  async delete(id: string): Promise<string | null> {
    const userExists = await this.findOne(id);
    if (userExists) {
      await this.userRepository.delete(id);
      return id;
    }
    return null;
  }
}
