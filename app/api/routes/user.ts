import { Router } from 'express';
const route = Router();
import * as userCtrl from '../../controllers/user';
import * as middleware from '../middleware';

export default (app: Router) => {
    app.use('/user', route);

    route.get('/favorites', middleware.isAuth, userCtrl.getFavorites);
    route.post('/favorites', middleware.isAuth, userCtrl.postFavorite);

    route.post('/register', userCtrl.register);
    route.get('/login', userCtrl.login);
    route.get('/verify', userCtrl.verify);
    route.get('/logout', middleware.isAuth, userCtrl.logout);
};