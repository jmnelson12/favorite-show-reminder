import { Request, Response } from 'express';
import { getTvShow, getMovie } from "./tmdb";
import { ShowType, IShow } from '../../interfaces';

let favorites: any[] = [];

const inFavorites = (id: number): boolean => {
    return favorites.some(f => f.id === id);
};

export async function getFavorites(req: Request | null, res: Response | null) {
    const promises = favorites.map(fav => {
        if (fav.type === ShowType.TV_Show) {
            return getTvShow(fav.id);
        } else if (fav.type === ShowType.Movie) {
            return getMovie(fav.id);
        }
    });
    const shows = await Promise.all(promises);

    if (res) {
        return res.status(200).json(shows);
    }
    return shows;
};
export async function postFavorite(req: Request, res: Response) {
    const { id, type } = req.body;

    if (id) {
        if (inFavorites(id)) {
            res.status(200).json("show already in favorites");
        } else {
            favorites.push({ id, type });
            res.status(200).json("added movie to favorites");
        }
    } else {
        res.status(501).json("Unable to add movie to favorites");
    }
}
export async function removeFavorite(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (id && inFavorites(id)) {
        const filteredFavorites = favorites.filter((fav: IShow) => fav.id !== id);
        favorites = filteredFavorites;

        const newFavorites = await getFavorites(null, null);
        res.status(200).json(newFavorites);
    } else {
        res.status(400).json('Favorite not found');
    }
}
