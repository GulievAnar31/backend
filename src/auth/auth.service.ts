import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(name: string, password: string) {
    const user = await User.findOne({ where: { name: name } });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const payload = { name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(name: string, password: string) {
    const existingUser = await User.findOne({ where: { name } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, password: hashedPassword });

    return { message: 'User registered successfully', userId: newUser.id };
  }
}
