import { Router, Request, Response } from 'express';
const route = Router();
import middleware from '../middleware';

let favorites: any[] = [];

export default (app: Router) => {
    app.use('/user', route);

    route.get('/favorites', (req: Request, res: Response) => {
        res.status(200).json(favorites);
    });

    route.post('/favorites', (req: Request, res: Response) => {
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
};