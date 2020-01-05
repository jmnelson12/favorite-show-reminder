import { Router } from 'express';
const route = Router();
import * as tmdb from '../../controllers/tmdb';

export default (app: Router) => {
    app.use('/tmdb', route);

    route.get('/popular', tmdb.getPopular);
    route.get('/search', tmdb.getSearch);
};