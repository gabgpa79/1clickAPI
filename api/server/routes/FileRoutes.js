import { Router } from 'express';
import FileController from '../controllers/FileController';

const router = Router();

router.put('/upload/item/:id', FileController.upload);
router.put('/uploads/item/:id', FileController.uploads);

router.put('/banner/item/:id', FileController.banner);
router.put('/slider/item/:id/slider/:slider', FileController.slider);



export default router;