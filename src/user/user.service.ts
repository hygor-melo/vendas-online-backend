import { Injectable } from '@nestjs/common'
import { CreateUserDTO } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  private users: UserEntity[] = [];

  async createUser(createUserDto: CreateUserDTO): Promise<UserEntity> {
    const saltOrRounds = 10;

    const pwdhashed = await hash(createUserDto.password, saltOrRounds);

    const user = {
      ...createUserDto,
      id: this.users.length + 1,
      password: pwdhashed
    }

    this.users.push(user);

    return user;
  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.users;
  }
}
