import { Router } from 'express';
import tmdb from './routes/tmdb';
import user from './routes/user';

export default () => {
    const router = Router();
    user(router);
    tmdb(router);

    return router;
};

