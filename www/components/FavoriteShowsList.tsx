import * as React from 'react';
import { IShow } from '../../interfaces';

type Props = {
    shows: any
};

const FavoriteShowsList: React.FunctionComponent<Props> = ({ shows }) => {
    const tvShows = shows?.filter((show: IShow) => show.type === "TV Show");
    const movies = shows?.filter((show: IShow) => show.type === "Movie");

    return (
        <>
            <div>
                <h1>Favorite TV Shows</h1>
                {tvShows?.map((show: IShow) => (
                    <div key={show.id} className={"show"}>
                        <h2>{show.title}</h2>
                        <img src={`https://image.tmdb.org/t/p/w154${show.posterPath}`} alt="poster path" />
                        <p>{show.overview}</p>
                        <img src={`https://image.tmdb.org/t/p/w154${show.backdropPath}`} alt="backdrop path" />
                        <p>popularity: {show.popularity}</p>
                        <p>vote count: {show.voteCount}</p>
                        <p>id: {show.id}</p>
                        <div>Genres: {show.genres?.map(genre => <span key={genre.id}>{genre.name}, </span>)}</div>
                        <p>vote average: {show.voteAverage}</p>
                        <p>type: {show.type}</p>
                    </div>
                ))}
            </div>
            <div>
                <h1>Favorite Movies</h1>
                {movies?.map((show: IShow) => (
                    <div key={show.id} className={"show"}>
                        <h2>{show.title}</h2>
                        <img src={`https://image.tmdb.org/t/p/w154${show.posterPath}`} alt="poster path" />
                        <p>{show.overview}</p>
                        <img src={`https://image.tmdb.org/t/p/w154${show.backdropPath}`} alt="backdrop path" />
                        <p>popularity: {show.popularity}</p>
                        <p>vote count: {show.voteCount}</p>
                        <p>id: {show.id}</p>
                        <div>Genres: {show.genres?.map(genre => <span key={genre.id}>{genre.name}, </span>)}</div>
                        <p>vote average: {show.voteAverage}</p>
                        <p>type: {show.type}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FavoriteShowsList;