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
                        <div>
                            Genres:
                            {show.genres?.map(genre => <span key={genre.id}>{genre.name}, </span>)}
                        </div>
                        <div>Release Date: {show.releaseDate}</div>
                    </div>
                ))}
            </div>
            <div>
                <h1>Favorite Movies</h1>
                {movies?.map((show: IShow) => (
                    <div key={show.id} className={"show"}>
                        <h2>{show.title}</h2>
                        <img src={`https://image.tmdb.org/t/p/w154${show.posterPath}`} alt="poster path" />
                        <div>Genres: {show.genres?.map(genre => <span key={genre.id}>{genre.name}, </span>)}</div>
                        <div>Release Date: {show.releaseDate}</div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FavoriteShowsList;