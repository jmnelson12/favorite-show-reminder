import axios from 'axios';
import config from '../config';
import { getGenres } from "../utils/genres";
import { Request, Response } from 'express';
import { IShow, ShowType } from "../../interfaces";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";


const parseData = (data: any[], type: ShowType = ShowType.Blank): IShow[] => {
    let results: IShow[] = [];

    data.forEach(d => {
        const {
            popularity,
            vote_count: voteCount,
            poster_path: posterPath,
            id,
            backdrop_path: backdropPath,
            genre_ids,
            title,
            name,
            first_air_date,
            vote_average: voteAverage,
            overview,
            release_date: releaseDate
        } = d;

        const genres = getGenres(genre_ids);
        let _type = type;

        _type = first_air_date ? ShowType.TV_Show : ShowType.Movie;

        results.push({
            popularity,
            voteCount,
            posterPath,
            id,
            backdropPath,
            genres,
            title: title || name,
            voteAverage,
            overview,
            releaseDate: releaseDate || first_air_date,
            type: _type
        });
    });

    return results;
};

const combineTopMoviesAndShows = (movies: IShow[] | null, tvShows: IShow[] | null, limit: number = 10) => {
    if (!movies) return tvShows?.slice(0, limit);
    if (!tvShows) return movies?.slice(0, limit);
    const combined = movies.concat(tvShows).sort((a, b) => b.popularity - a.popularity);

    return combined.slice(0, limit);
};

const runSearch = async (query: string) => {
    const { data: { results: tvRes } } = await axios.get(`${TMDB_BASE_URL}/search/tv?api_key=${config.TMDB_KEY}&language=en-US&query=${query}&page=1`);
    const { data: { results: movieRes } } = await axios.get(`${TMDB_BASE_URL}/search/movie?api_key=${config.TMDB_KEY}&language=en-US&query=${query}&page=1`);

    return [...tvRes, ...movieRes];
};

/** Movie Section */
const getPopularMovies = async (page: number = 1): Promise<IShow[] | null> => {
    try {
        const { data: { results } } = await axios.get(`${TMDB_BASE_URL}/discover/movie?api_key=${config.TMDB_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`);

        return parseData(results, ShowType.Movie);
    } catch (e) {
        return null;
    }
};
const getMovie = async (id: number): Promise<IShow | null> => {
    try {
        const { data } = await axios.get(`${TMDB_BASE_URL}/movie/${id}?api_key=${config.TMDB_KEY}&language=en-US`);

        return {
            popularity: data.popularity,
            voteCount: data.vote_count,
            posterPath: data.poster_path,
            id: data.id,
            backdropPath: data.backdrop_path,
            genres: data.genres,
            title: data.title,
            voteAverage: data.vote_average,
            overview: data.overview,
            releaseDate: data.release_date,
            type: ShowType.Movie
        };
    } catch (e) {
        return null;
    }
};

/** TV Show Section */
const getPopularTVShows = async (page: number = 1): Promise<IShow[] | null> => {
    try {
        const { data: { results } } = await axios.get(`${TMDB_BASE_URL}/tv/popular?api_key=${config.TMDB_KEY}&sort_by=popularity.desc&language=en-US&page=${page}`);

        return parseData(results, ShowType.TV_Show);
    } catch (e) {
        return null;
    }
};
const getTvShow = async (id: number): Promise<IShow | null> => {
    try {
        const { data } = await axios.get(`${TMDB_BASE_URL}/tv/${id}?api_key=${config.TMDB_KEY}&language=en-US`);

        return {
            popularity: data.popularity,
            voteCount: data.vote_count,
            posterPath: data.poster_path,
            id: data.id,
            backdropPath: data.backdrop_path,
            genres: data.genres,
            title: data.name,
            voteAverage: data.vote_average,
            overview: data.overview,
            releaseDate: data.first_air_date,
            type: ShowType.TV_Show
        };
    } catch (e) {
        return null;
    }
};

const getPopular = async (req: Request, res: Response) => {
    const [popularMovies, popularTVShows] = [await getPopularMovies(), await getPopularTVShows()];

    if (!popularMovies && !popularTVShows) {
        return res.status(501).json("Unable to fetch shows");
    }

    const topShows = combineTopMoviesAndShows(popularMovies, popularTVShows);

    res.status(200).json(topShows);
};
const getSearch = async (req: Request, res: Response) => {
    const { query }: { query: string } = req.query;

    try {
        const data = parseData(await runSearch(query));

        res.status(200).json(data);
    } catch (e) {
        res.status(501).json('Error! Couldn\'t search movies and tv shows :(');
    }
};

// Exports
export {
    getMovie,
    getTvShow,
    getPopular,
    getSearch
};