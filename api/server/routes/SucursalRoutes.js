import { Router } from 'express';
import SucursalController from '../controllers/SucursalController';
const router = Router();

/*Protected*/

router.get('/lista/:cliente', SucursalController.data);
router.get('/listar/:name', SucursalController.listar);
router.post('/', SucursalController.registrar);
router.put('/:id', SucursalController.actualizar);
router.delete('/:id', SucursalController.borrar);

export default router;

