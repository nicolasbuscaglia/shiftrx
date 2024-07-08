import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { AccessToken } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async get(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.get({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new BadRequestException('Username or password incorrect');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(newUser: Prisma.UserCreateInput): Promise<AccessToken> {
    const { username, password } = newUser;

    const user = await this.get({ username });

    if (user) {
      throw new BadRequestException('Username already exist');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const userCreated = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const payload = { username: userCreated.username, sub: userCreated.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
