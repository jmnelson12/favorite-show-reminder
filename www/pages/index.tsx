import { NextPage } from "next";
import url from 'url';
import * as React from 'react';
import { IMovieResponse, IMovie } from "../interfaces";
import axios from 'axios';

import MainLayout from "../components/MainLayout";

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

type Props = {
    items: any
};

const MovieList: React.FunctionComponent<Props> = ({ items }) => {
    /**
     * Movie Widths
     * "w92", "w154", "w185", "w342", "w500", "w780", or "original"
     * 
     */

    const addToFavorites = async (id: number) => {
        const baseUrl = absoluteUrl(null, 'localhost:8080');
        const apiUrl = process.env.NODE_ENV === 'production' ? `${baseUrl}api/me/favorites` : 'http://localhost:8080/api/me/favorites';

        try {
            const res = await axios.post(apiUrl, {
                id
            });
            console.log(res);

        } catch (ex) {
            console.error(`Error fetching data from ${apiUrl} - ${ex.message}`);
        }
    };

    return items?.map((movie: IMovie) => {
        return (
            <div key={movie.id}>
                <p>{movie.title}</p>
                <img src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`} alt="poster path" />
                <p>{movie.overview}</p>
                <img src={`https://image.tmdb.org/t/p/w154${movie.backdrop_path}`} alt="backdrop path" />
                <br />
                <button onClick={() => addToFavorites(movie.id)}>Add To Favorites</button>
                <hr />
            </div>
        );
    });
};

const Index: NextPage<Props> = ({ items }) => (
    <MainLayout title="Show Reminder">
        <h1>Index Page</h1>
        <hr />
        <MovieList items={items} />
    </MainLayout>
);

Index.getInitialProps = async ({ req }) => {
    const baseUrl = absoluteUrl(req, 'localhost:8080');
    const apiUrl = process.env.NODE_ENV === 'production' ? `${baseUrl}api/tmdb/popular` : 'http://localhost:8080/api/tmdb/popular';

    try {
        const { status, data } = await axios.get(apiUrl);

        return { items: data.data.results };
    } catch (ex) {
        console.error(`Error fetching data from ${apiUrl} - ${ex.message}`);
        return { items: [] };
    }
};

export default Index;