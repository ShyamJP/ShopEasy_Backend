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

router.post('/:id', authmiddleware, createClient);
router.put('/:id/:clientId', authmiddleware, updateClient);
router.delete('/:id/:clientId', authmiddleware, deleteClient);
router.get('/:id/:serviceId/search', authmiddleware, searchClient);
router.get('/:id/:serviceId', authmiddleware, getClients);
router.get('/:id/:serviceId/:clientId', authmiddleware, getClient);
