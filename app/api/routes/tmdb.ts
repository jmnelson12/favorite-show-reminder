import { Router, Request, Response } from 'express';
import axios from 'axios';
import config from '../../config';
const route = Router();

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export default (app: Router) => {
    app.use('/tmdb', route);

    route.get('/popular', async (req: Request, res: Response) => {
        const { data, status } = await axios.get(`${TMDB_BASE_URL}/discover/movie?api_key=${config.TMDB_KEY}&language=en-US&sort_by=popularity.desc&page=1`);

        console.log(data.results[0]);

        res.status(200).json({ data, status });
    });
};