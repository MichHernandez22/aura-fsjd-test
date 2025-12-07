import { AppDataSource } from '../config/database';
import { User, SafeUserData } from '../entities/User';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import jwt from 'jsonwebtoken';
import { AppError } from '../middlewares/error.middleware';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(registerDto: RegisterDto): Promise<{
    user: SafeUserData;
    token: string;
  }> {
    // Checar si el email ya está registrado
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new AppError('Email ya registrado', 400);
    }

    // Crear y guardar el nuevo usuario
    const user = this.userRepository.create(registerDto);
    await this.userRepository.save(user);

    // Generar JWT token
    const token = this.generateToken(user.id);

    const safeUser = user.toSafe();

    return {
      user: safeUser,
      token,
    };
  }

  async login(loginDto: LoginDto): Promise<{
    user: SafeUserData;
    token: string;
  }> {
    // Encontrar el usuario con password
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password') // Incluir password explícitamente
      .where('user.email = :email', { email: loginDto.email })
      .getOne();

    if (!user) {
      throw new AppError('Credenciales Invalidas', 401);
    }

    // Validar el password
    const isValidPassword = await user.validatePassword(loginDto.password);
    
    if (!isValidPassword) {
      throw new AppError('Credenciales Invalidas', 401);
    }

    // Generar JWT token
    const token = this.generateToken(user.id);

    const safeUser = user.toSafe();

    return {
      user: safeUser,
      token,
    };
  }

  private generateToken(userId: string): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET no esta definido');
    }

    const expiresIn = process.env.JWT_EXPIRES_IN || '24h';
    
    return jwt.sign(
      { id: userId },
      secret,
      { expiresIn } as jwt.SignOptions
    );
  }
}