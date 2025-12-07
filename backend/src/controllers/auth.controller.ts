import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';

export class AuthController {
  private authService = new AuthService();

  async register(req: Request, res: Response) {
    try {
      const registerDto: RegisterDto = req.body;
      const result = await this.authService.register(registerDto);

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginDto: LoginDto = req.body;
      const result = await this.authService.login(loginDto);

      res.json({
        success: true,
        message: 'Login exitoso',
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }
}