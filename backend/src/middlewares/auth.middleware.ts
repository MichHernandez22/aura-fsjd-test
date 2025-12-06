import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';

// Extender la interfaz Request para incluir el usuario autenticado
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //const token = req.header('Authorization')?.replace('Bearer ', '');
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('Se requiere autenticación');
    }

    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
      id: string;
    };

    // Buscar el usuario en la base de datos
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: decoded.id },
      select: ['id', 'email', 'firstName', 'lastName', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Asignar el usuario al request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Auntenficate',
      error: error instanceof Error ? error.message : 'Error de autenticación',
    });
  }
};