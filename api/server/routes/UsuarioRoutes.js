import { Router } from 'express';
import KeyToken from './keyToken'
import UsuarioController from '../controllers/UsuarioController';

const router = Router();
router.post('/', UsuarioController.addUsuario);
router.get("/verificar/:username", UsuarioController.verificarUsername);
router.post("/panico", UsuarioController.sendPanico);
router.post('/login', UsuarioController.login);
router.get("/:id", UsuarioController.getItem);


/*router.get('/verificarPatrocinador/:enlace', UsuarioController.regPatrocinador);
router.post('/verificarUsername', UsuarioController.verificarUsername);
router.post('/verificarEmail', UsuarioController.verificarEmail);
router.post('/', UsuarioController.addUsuario);
router.get('/verificarConfirmacion/:enlace', UsuarioController.regConfirmacion);
router.put('/:id', UsuarioController.actualizar)
router.post('/restore/password/user', UsuarioController.restore)

router.post('/login', UsuarioController.login);
//enlaces protegidos
/*router.post('/totales',KeyToken,UsuarioController.totales);
router.get('/listar/:page/:num', UsuarioController.listar);
router.post('/search/items', KeyToken,UsuarioController.search);
router.put('/change/password/:id', UsuarioController.restorePassword)
router.delete('/:id', UsuarioController.delete)*/

export default router;

