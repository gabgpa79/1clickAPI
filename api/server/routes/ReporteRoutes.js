import { Router } from 'express';
import ReporteController from '../controllers/ReporteController';
const router = Router();

/*Protected*/
router.get('/ingresos', ReporteController.ingresos);
router.get('/registros', ReporteController.registros);
router.get('/paquetes', ReporteController.paquetes);
export default router;

