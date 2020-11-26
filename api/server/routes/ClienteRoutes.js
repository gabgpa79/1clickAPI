import { Router } from "express";
import KeyToken from "./keyToken";
import ClienteController from "../controllers/ClienteController";

const router = Router();

router.post("/login", ClienteController.login);
router.post("/verificarUsername", ClienteController.verificarUsername);
router.post("/registrar", ClienteController.registrarCliente);
router.get("/verificarConfirmacion/:enlace", ClienteController.regConfirmacion);
router.put("/:id", ClienteController.actualizar);
router.post('/restore/password/user', ClienteController.restore)
router.put('/change/password/:id', ClienteController.restorePassword)

/*Enlaces protegidos*/
router.post("/", ClienteController.add);
router.get("/lista/:page/:num", ClienteController.lista);
router.delete("/:id", ClienteController.deleteCliente);
router.post("/aprobar", ClienteController.aprobarCliente);
router.get("/:id", ClienteController.getItem);
router.post("/search", ClienteController.search);
export default router;
