import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserRepository } from './users.repository';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1')
export class UsersController {
  constructor(private readonly usersService: UserRepository) {}

  @Get('get-users')
  async getUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (pageNumber < 1 || limitNumber < 1) {
      throw new Error('Page and limit must be greater than 0');
    }

    return this.usersService.findAll(pageNumber, limitNumber);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add-user')
  async addUser(
    @Body() body: { name: string; email: string; phone: string },
  ): Promise<User> {
    return this.usersService.create(body.name, body.email, body.phone);
  }

  @Get('get-user/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }
}
