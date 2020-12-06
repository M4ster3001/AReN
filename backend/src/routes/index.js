import { Router } from 'express';
import adRouter from './ad.routes';
import categoriesRouter from './categories.routes';
import locationsRouter from './location.routes';
import userRouter from './users.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/ad', adRouter);
routes.use('/categories', categoriesRouter);
routes.use('/states', locationsRouter);

export default routes;
