import { Router } from 'express';

// Controllers
import usersControllers from '../controllers/usersControllers';

require('dotenv').config({ path: 'variables.env' });

const userRouter = Router();

/* userRouter */
// Users
userRouter.get('/', usersControllers.index);
userRouter.post('/login', usersControllers.login);
userRouter.post('/register', usersControllers.create);
userRouter.delete('/delete', usersControllers.remove);

export default userRouter;
