import { Router } from 'express';

import categoriesControllers from '../controllers/categoriesControllers';

require('dotenv').config({ path: 'variables.env' });

const categoriesRouter = Router();

/* categoriesRouter */
// Categories
categoriesRouter.get('/', categoriesControllers.index);
categoriesRouter.post('/register', categoriesControllers.create);
categoriesRouter.put('/update', categoriesControllers.update);
categoriesRouter.delete('/delete', categoriesControllers.remove);

export default categoriesRouter;
