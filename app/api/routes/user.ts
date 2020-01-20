import { Router } from 'express';
const route = Router();
import * as favCtrl from '../../controllers/favorites';

export default (app: Router) => {
    app.use('/user', route);

    route.get('/favorites', favCtrl.getFavorites);
    route.post('/favorites', favCtrl.postFavorite);
    route.delete('/favorites/:id', favCtrl.removeFavorite);

};