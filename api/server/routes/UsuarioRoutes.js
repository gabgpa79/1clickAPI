import { Router } from 'express';
import KeyToken from './keyToken'
import UsuarioController from '../controllers/UsuarioController';

const router = Router();

router.post('/login', UsuarioController.login);
router.post('/', UsuarioController.addUsuario);
router.get("/:id", UsuarioController.getItem);
router.post("/panico", UsuarioController.sendPanico);

export default router;

