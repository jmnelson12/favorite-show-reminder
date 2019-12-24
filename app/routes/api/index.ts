import express from 'express';
import axios from 'axios';
import config from "../../config";

const server = express();
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

try {
    const tmdbKey = config ? config.TMDB_KEY : process.env.TMDB_KEY;

    server.get('/api/tmdb/popular', async (req: any, res: any) => {
        const { data, status } = await axios.get(`${TMDB_BASE_URL}/discover/movie?api_key=${tmdbKey}&language=en-US&sort_by=popularity.desc&page=1`);

        res.status(200).json({ data, status });
    });
} catch (err) {
    throw `Server Error in API: ${err}`;
}

export default server;