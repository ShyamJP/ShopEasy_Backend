import { Request, Response, Router } from 'express';
import {
  register,
  login,
  logOut,
  updateUser,
  forgotPassword,
} from '../controllers/users';
import authMiddleware from '../middlewares/auth';

export const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logOut);
router.put('/update/:id', authMiddleware, updateUser);
router.post('/forgotPass', authMiddleware, forgotPassword);
