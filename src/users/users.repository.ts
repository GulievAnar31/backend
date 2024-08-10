import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(name: string, email: string, phone: string): Promise<User> {
    const userData = { name: name, email, phone };
    return this.userModel.create(userData);
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ users: User[]; total: number }> {
    const offset = (page - 1) * limit;
    const { count, rows } = await this.userModel.findAndCountAll({
      limit,
      offset,
    });

    return {
      users: rows,
      total: count,
    };
  }
}
