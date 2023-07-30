import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReturnUserDTO } from 'src/user/dtos/returnUser.dto';
import { LoginDTO } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ReturnLogin } from './dtos/returnLogin.dto';

@Controller('auth')
export class AuthController
{

  constructor(
    private readonly authService: AuthService
  ){}

  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() login: LoginDTO): Promise<ReturnLogin>
  {
    return await this.authService.login(login);
  }
}