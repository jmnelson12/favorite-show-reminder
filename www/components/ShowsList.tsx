import url from 'url';
import * as React from 'react';
import { IShow } from "../../interfaces";

import { postRequest } from "../utils/index";

type Props = {
    shows: any
};

const absoluteUrl = (req: any, setLocalhost: any) => {
    let protocol = 'https'
    let host = req ? req.headers.host : window.location.hostname
    if (host.indexOf('localhost') > -1) {
        if (setLocalhost) host = setLocalhost
        protocol = 'http'
    }

    return url.format({
        protocol,
        host,
        pathname: '/' // req.url
    })
};

const ShowsList: React.FunctionComponent<Props> = ({ shows }) => {
    /**
     * Movie Widths
     * "w92", "w154", "w185", "w342", "w500", "w780", or "original"
     * 
     */

    const addToFavorites = async (id: number, type: string | undefined = "") => {
        try {
            const res = await postRequest('api/user/favorites', {
                id,
                type
            });
        } catch (ex) {
            console.error(`${ex.message}`);
        }
    };

    return shows?.map((movie: IShow) => {
        const posterPath = movie.posterPath ? `https://image.tmdb.org/t/p/w185${movie.posterPath}` : "/images/default-movie.png"
        return (
            <div key={movie.id} className="show">
                <img src={`https://image.tmdb.org/t/p/original${movie.backdropPath}`} className="backdrop" alt="backdrop path" />
                <img src={posterPath} className="poster" alt="poster path" />
                <div className="inner">
                    <div className="left">
                        <div className="genreList">
                            {movie.genres?.map(genre => <p key={genre.id}>{genre.name}</p>)}
                        </div>
                        <div className="titleWrapper">
                            <h1>{movie.title}</h1>
                        </div>
                        <div className="extra">
                            <div className="type">
                                {movie.type}
                            </div>
                            <div className="favBtnWrapper">
                                <button onClick={() => addToFavorites(movie.id, movie.type)}>
                                    Add To Favorites
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <p>OVERVIEW</p>
                        <p className="text">{movie.overview}</p>
                    </div>
                </div>
            </div>
        );
    });
};

export default ShowsList;