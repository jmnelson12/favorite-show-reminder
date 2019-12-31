import { NextPage } from "next";
import url from 'url';
import * as React from 'react';
import axios from 'axios';

import MainLayout from "../components/MainLayout";
import ShowsList from "../components/ShowsList";
import { IShow } from "../../interfaces";

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

const Index: NextPage<Props> = ({ shows }) => {
    const [_shows, setShows] = React.useState<IShow[]>(shows);

    React.useEffect(() => {
        const interval = setInterval(() => {
            const showsCopy: IShow[] = [..._shows];
            const firstInArr: any = showsCopy.shift();

            showsCopy.push(firstInArr);

            setShows(showsCopy);
        }, 15000);

        return () => clearInterval(interval);
    }, [_shows]);

    return (
        <MainLayout title="Show Reminder">
            <div className="showsList">
                <ShowsList shows={_shows} />
            </div>
            <div id="main">
                <h1>Test</h1>
            </div>
            <style jsx global>{`
            div.show {
                width: 100%;
                height: 100vh;    
                position: relative;
                padding: 15px;
                display: flex;
                box-sizing: border-box;
            }

            div.show:not(:first-of-type) {
                display: none;
            }

            img.backdrop {
                position: fixed;
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
                display: flex;
                flex-flow: row wrap;
                align-items: flex-end;
                color: #fefefe;
                text-shadow: 0px 0px 3px rgba(0,0,0,0.5);
                padding: 45px;
                padding-bottom: 65px;
            }

            div.inner > .left {
                width: 60%;
            }
            div.inner > .right {
                width: 40%;
            }

            div.inner .left .genreList p {
                float: left;
                font-size: 14px;
            }

            div.inner .left .genreList p:not(:first-of-type) {
                margin: 0 15px;
            }

            div.inner .left .titleWrapper {
                clear: left;
            }

            div.inner .left .titleWrapper h1 {
                font-size: 3em;
            }

            div.inner .right .text {
                font-family: arial, sans-serif;
                font-size: 16px;
                line-height: 30px;
            }

            #main {
                position: relative;
                z-index: 2;
                background-color: #24292e;
                display: flex;
            }

            @media screen and (max-width: 945px){
                div.inner > .left {
                    width: 100%;
                    margin-bottom: 15px;
                }
                div.inner > .right {
                    width: 100%;
                }
            }
        `}</style>
        </MainLayout>
    )
};

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