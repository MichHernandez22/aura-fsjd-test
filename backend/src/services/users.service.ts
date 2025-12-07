import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AppError } from '../middlewares/error.middleware';

export class UsersService {
  private userRepository = AppDataSource.getRepository(User);

  async getProfile(userId: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'firstName', 'lastName', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    return user;
  }

  async updateProfile(userId: string, updateData: UpdateUserDto): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'firstName', 'lastName', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    // Actualiza datos del usuario
    Object.assign(user, updateData);
    await this.userRepository.save(user);

    return user;
  }

  async getAllUsers(): Promise<Array<Omit<User, 'password'>>> {
    const users = await this.userRepository.find({
      select: ['id', 'email', 'firstName', 'lastName', 'createdAt', 'updatedAt'],
      order: { createdAt: 'DESC' },
    });

    return users;
  }
}