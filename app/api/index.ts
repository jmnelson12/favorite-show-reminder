import { Router } from 'express';
import tmdb from './routes/tmdb';
import user from './routes/user';
import agendash from './routes/agendash';

export default () => {
    const router = Router();
    tmdb(router);
    agendash(router);
    user(router);

    return router;
};

