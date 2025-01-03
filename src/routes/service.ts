import { Router } from 'express';
import {
  createService,
  deleteService,
  getServices,
  updateService,
} from '../controllers/service';
import authMiddleware from '../middlewares/auth';
export const router = Router();

router.post('/', authMiddleware, createService);
router.put('/:id', authMiddleware, updateService);
router.delete('/:id', authMiddleware, deleteService);
router.get('/:id', authMiddleware, getServices);
