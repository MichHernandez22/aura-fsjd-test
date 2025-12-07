import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';

const router = Router();
const authController = new AuthController();

router.post(
  '/register',
  validationMiddleware(RegisterDto),
  authController.register.bind(authController)
);

router.post(
  '/login',
  validationMiddleware(LoginDto),
  authController.login.bind(authController)
);

export default router;