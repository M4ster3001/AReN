import { Router } from 'express';

// Controllers
import statesControllers from '../controllers/statesControllers';

require('dotenv').config({ path: 'variables.env' });

const locationsRouter = Router();

/* locationsRouter */
// States
locationsRouter.get('/', statesControllers.index);
locationsRouter.post('/register', statesControllers.create);
locationsRouter.put('/update', statesControllers.update);
locationsRouter.delete('/delete', statesControllers.remove);

export default locationsRouter;
