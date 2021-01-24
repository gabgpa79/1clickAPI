import { Router } from 'express';
import HorarioController from '../controllers/HorarioController';
const router = Router();

/*Protected*/
router.get('/lista/:page/:num', HorarioController.data);
router.get('/listar/:name', HorarioController.listar);
router.get('/cliente/:id/:tipo', HorarioController.cliente);
router.post('/', HorarioController.registrar);
router.put('/:id', HorarioController.actualizar);
router.delete('/:id', HorarioController.borrar);
export default router;

