import { Controller, Get } from '@nestjs/common';
import {
  AllowAnyRole,
  Public,
  Roles,
  Unprotected,
} from 'nest-keycloak-connect';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/public')
  @Unprotected()
  getpublic(): string {
    return `${this.userService.getHello()} from public`;
  }

  @Get('/user')
  @Roles('user')
  // @Roles('realm:app-user') // protected using realm role
  getUser(): string {
    return `${this.userService.getHello()} from user`;
  }

  @Get('/admin')
  @Roles('admin')
  getAdmin(): string {
    return `${this.userService.getHello()} from admin`;
  }

  @Get('/all')
  @AllowAnyRole()
  getAll(): string {
    return `${this.userService.getHello()} from all`;
  }
}
