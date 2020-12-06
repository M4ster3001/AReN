import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';

// Controllers
import adsControllers from '../controllers/adsControllers';
import {
  index,
  create,
  update,
  Delete,
} from '../controllers/galleryControllers';

require('dotenv').config({ path: 'variables.env' });

const adRouter = Router();

// Ads
adRouter.get('/', adsControllers.index);
adRouter.get('/list', adsControllers.index);
adRouter.get('/view', adsControllers.index);
adRouter.post('/register', adsControllers.create);
adRouter.put('/update', adsControllers.update);
adRouter.delete('/delete', adsControllers.remove);

// Gallery
adRouter.get('/gallery', index);
adRouter.get('/gallery/list', index);
adRouter.post('/gallery/register', multer(multerConfig).single('file'), create);
adRouter.put('/gallery/update', multer(multerConfig).single('file'), update);
adRouter.delete('/gallery/delete/:id', Delete);

export default adRouter;
