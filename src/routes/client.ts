import { Router } from 'express';
import {
  createClient,
  deleteClient,
  getClients,
  searchClient,
  updateClient,
} from '../controllers/client';

export const router = Router();

router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);
router.get('/:userId/:serviceId/search', searchClient);
router.get('/:userId/:serviceId', getClients);
