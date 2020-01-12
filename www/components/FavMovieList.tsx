import * as React from 'react';
import { IShow } from '../../interfaces';
import { trimStringBasedOnWords } from '../utils/index';

type Props = {
    movies: IShow[]
};

const FavMovieList: React.FunctionComponent<Props> = ({ movies }) => {
    return (
        <>
            <h1>Favorite Movies</h1>
            <div className={"listContainer"}>
                {movies?.map((movie: IShow) => (
                    <div key={movie.id} className="show">
                        <img src={`https://image.tmdb.org/t/p/w342${movie.backdropPath}`} alt={movie.title} />
                        <div className="released">Released: {movie.releaseDate}</div>
                        <h2 className="title">{movie.title}</h2>

                        <div className="details">
                            <div>Released: {movie.releaseDate}</div>
                            <h2>{movie.title}</h2>

                            <div className="overviewWrapper">
                                <p>Overview</p>
                                <p className="overview">
                                    {
                                        trimStringBasedOnWords(movie.overview)
                                    }
                                </p>
                            </div>

                            <div className="actions">
                                <button className="btnRemove">Remove</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
};

export default FavMovieList;