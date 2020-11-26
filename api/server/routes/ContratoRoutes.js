import { Router } from 'express';
import KeyToken from './keyToken'
import ContratoController from '../controllers/ContratoController';

const router = Router();
/*usuarios protegidos*/
router.post('/', ContratoController.add);
router.get('/:id', ContratoController.getContrato);
/*const {clienteId, paqueteId, monto }*/
export default router;

