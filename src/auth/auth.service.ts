import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    const passwordIsMatch = await bcrypt.compare(password, user.password);

    if (user && passwordIsMatch) {
      return user;
    }

    throw new UnauthorizedException('Email or password is incorrect');
  }

  async login(user: IUser) {
    const { id, email } = user;
    const payload = { id: id, email: email };

    return {
      id,
      email,
      token: this.jwtService.sign(payload),
    };
  }
}
