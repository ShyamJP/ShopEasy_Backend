import { Router } from 'express';
import {
  createService,
  deleteService,
  getServices,
  updateService,
} from '../controllers/service';
import authmiddleware from '../middlewares/auth';
export const router = Router();

router.post('/', authmiddleware, createService);
router.put('/:id', authmiddleware, updateService);
router.delete('/:id', authmiddleware, deleteService);
router.get('/:id', authmiddleware, getServices);
