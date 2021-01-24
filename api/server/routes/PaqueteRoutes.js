import { Router } from 'express';
import PaqueteController from '../controllers/PaqueteController';
const router = Router();

/*Protected*/
router.get('/lista/:page/:num/:prop/:orden', PaqueteController.data);
router.get('/listar/:name', PaqueteController.listar);
router.get('/:id', PaqueteController.item);
router.post('/', PaqueteController.registrar);
router.put('/:id', PaqueteController.actualizar);
router.delete('/:id', PaqueteController.borrar);
export default router;

