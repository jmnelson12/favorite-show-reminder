import { Router } from 'express';
const route = Router();
import * as userCtrl from '../../controllers/user';
import * as favCtrl from '../../controllers/favorites';
import * as middleware from '../middleware';

export default (app: Router) => {
    app.use('/user', route);

    route.get('/favorites', middleware.isAuth, favCtrl.getFavorites);
    route.post('/favorites', middleware.isAuth, favCtrl.postFavorite);

    route.post('/register', userCtrl.register);
    route.get('/login', userCtrl.login);
    route.get('/verify', middleware.isAuth, userCtrl.verify);
    route.get('/logout', middleware.isAuth, userCtrl.logout);
};