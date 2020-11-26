import { Router } from "express";
import KeyToken from "./keyToken";
import ClienteController from "../controllers/ClienteController";

const router = Router();
router.get("/lista/:page/:num/:categoria/:estado/:nombre", ClienteController.consulta);
router.get("/:id", ClienteController.getItem);
router.get("/lista/servicios", ClienteController.getServicios);
router.get("/lista/emergencias", ClienteController.getEmergencias);
export default router;
