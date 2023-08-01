import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { LoginDTO } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDTO } from '../user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ){}


  async login(login: LoginDTO): Promise<ReturnLogin>
  {
    const user: UserEntity | undefined = await this.userService.findUserByEmail(login.email).catch(() => undefined);

    const isMatch = await compare(login.password, user?.password || '');

    if(!user || !isMatch)
      throw new NotFoundException('Email or password invalid');

    return {
      accessToken: this.jwtService.sign({...new LoginPayload(user)}),
      user: new ReturnUserDTO(user)
    };
  }
}
