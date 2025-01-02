import { Router } from 'express';
import {
  createClient,
  deleteClient,
  getClients,
  searchClient,
  updateClient,
  getClient,
} from '../controllers/client';
import authmiddleware from '../middlewares/auth';

export const router = Router();

router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);
router.get('/:userId/:serviceId/search', searchClient);
router.get('/:userId/:serviceId', getClients);
router.get('/:userId/:serviceId/:id', getClient);
