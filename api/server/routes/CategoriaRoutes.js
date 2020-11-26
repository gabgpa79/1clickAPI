import { Router } from 'express';
import CategoriaController from '../controllers/CategoriaController';
const router = Router();

/*Protected*/
router.get('/lista/:page/:num', CategoriaController.data);
router.get('/listar/:name', CategoriaController.listar);
router.post('/', CategoriaController.registrar);
router.put('/:id', CategoriaController.actualizar);
router.delete('/:id', CategoriaController.borrar);
export default router;

