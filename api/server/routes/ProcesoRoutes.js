import { Router } from 'express';
import KeyToken from './keyToken'
import ProcesoController from '../controllers/ProcesoController';

const router = Router();

router.get('/listar/:page/:num/:usuarioId', KeyToken,ProcesoController.listar);

export default router;

