import express from 'express';
import axios from 'axios';
import config from "../../config";
import bodyParser from "body-parser";

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

let favorites: any[] = [];

try {
    const tmdbKey = config ? config.TMDB_KEY : process.env.TMDB_KEY;

    /** TMDB Section */
    server.get('/api/tmdb/popular', async (req: express.Request, res: express.Response) => {
        const { data, status } = await axios.get(`${TMDB_BASE_URL}/discover/movie?api_key=${tmdbKey}&language=en-US&sort_by=popularity.desc&page=1`);

        console.log(data.results[0]);

        res.status(200).json({ data, status });
    });

    /** Favorites Section */
    server.get('/api/me/favorites', async (req: express.Request, res: express.Response) => {
        res.status(200).json(favorites);
    });
    server.post('/api/me/favorites', async (req: express.Request, res: express.Response) => {
        const { id } = req.body;

        if (id) {
            if (favorites.indexOf(id) !== -1) {
                res.status(200).json("show already in favorites");
            } else {
                favorites.push(id);
                res.status(200).json("added movie to favorites");
            }
        } else {
            res.status(501).json("Unable to add movie to favorites");
        }
    });

    server
} catch (err) {
    throw `Server Error in API: ${err}`;
}

export default server;