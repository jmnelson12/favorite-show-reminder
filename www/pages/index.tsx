import { NextPage } from "next";
import url from 'url';
import * as React from 'react';
import { IMovieResponse, IMovie } from "../interfaces";
import axios from 'axios';

import Layout from "../components/Layout";

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
    return items?.map((movie: IMovie) => {
        return (
            <div key={movie.id}>
                <p>{movie.title}</p>
            </div>
        );
    });
};

const Index: NextPage<Props> = ({ items }) => (
    <Layout title="Show Reminder">
        <h1>Index Page</h1>
        <hr />
        <MovieList items={items} />
    </Layout>
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
}

export default Index;