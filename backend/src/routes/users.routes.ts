import { Router } from 'express';
import { UsersController } from '../controllers/users.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { UpdateUserDto } from '../dtos/update-user.dto';

const router = Router();
const usersController = new UsersController();

// Aplicar middleware de autenticación a todas las rutas definidas después de esta línea
router.use(authMiddleware);

router.get('/profile', usersController.getProfile.bind(usersController));
router.put(
  '/profile',
  validationMiddleware(UpdateUserDto),
  usersController.updateProfile.bind(usersController)
);
router.get('/', usersController.getAllUsers.bind(usersController));

export default router;