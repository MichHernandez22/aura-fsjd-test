import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dtos/update-user.dto';

export class UsersController {
  private usersService = new UsersService();

  async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const user = await this.usersService.getProfile(userId);

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const updateData: UpdateUserDto = req.body;
      const updatedUser = await this.usersService.updateProfile(userId, updateData);

      res.json({
        success: true,
        message: 'Perfil actualizado exitosamente',
        data: updatedUser,
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.usersService.getAllUsers();

      res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      throw error;
    }
  }
}