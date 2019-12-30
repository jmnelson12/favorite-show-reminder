import { NextPage } from "next";
import url from 'url';
import * as React from 'react';
import axios from 'axios';

import MainLayout from "../components/MainLayout";
import ShowsList from "../components/ShowsList";

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
    shows: any
};

const Index: NextPage<Props> = ({ shows }) => (
    <MainLayout title="Show Reminder">
        <ShowsList shows={shows} />

        <style jsx global>{`
            div.show:not(:first-of-type) {
                display: none;
            }

            img.backdrop {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                z-index: 0;
            }

            div.inner {
                position: relative;
                z-index: 1;
            }
        `}</style>
    </MainLayout>
);

Index.getInitialProps = async ({ req }) => {
    const baseUrl = absoluteUrl(req, 'localhost:8080');
    const apiUrl = process.env.NODE_ENV === 'production' ? `${baseUrl}api/tmdb/popular` : 'http://localhost:8080/api/tmdb/popular';

    try {
        const { data } = await axios.get(apiUrl);
        return { shows: data };
    } catch (ex) {
        console.error(`Error fetching data from ${apiUrl} - ${ex.message}`);
        return { shows: [] };
    }
};

export default Index;