import { NextPage } from "next";
import * as React from 'react';
import { IShow } from "../../interfaces";
import { getPopular, runSearch } from '../api/tmdb';
import { scrollToRef } from "../utils";
import { verify } from '../api/user';

import MainLayout from "../components/MainLayout";
import ShowsList from "../components/ShowsList";
import Search from '../components/Search';

type Props = {
    shows: any;
};

const Index: NextPage<Props> = ({ shows }) => {
    const [_shows, setShows] = React.useState<IShow[]>(shows);
    const [searchList, setSearchList] = React.useState<IShow[]>([]);
    const [resultsFound, setResultsFound] = React.useState<boolean>(true);
    const searchResultsRefEl = React.useRef(null);

    React.useEffect(() => {
        const interval = setInterval(() => {
            const showsCopy: IShow[] = [..._shows];
            const firstInArr: any = showsCopy.shift();

            showsCopy.push(firstInArr);

            setShows(showsCopy);
        }, 15000);

        return () => clearInterval(interval);
    }, [_shows]);

    const handleSearch = async (query: string) => {
        if (query && query.trim().length >= 1) {
            const data = await runSearch(query);

            const areData = data && data.length !== 0;

            setResultsFound(areData)
            setSearchList(areData ? data : []);
            scrollToRef(searchResultsRefEl);
        }
    };

    return (
        <MainLayout title="Show Reminder">
            <div className="showsList">
                <ShowsList shows={_shows} />

                <style jsx global>{`
                    div.inner .left .favBtnWrapper button {
                        background-color: #007bff;
                        margin-top: 5px;
                        cursor: pointer;
                        color: #fff;
                        font-weight: 400;
                        text-align: center;
                        white-space: nowrap;
                        vertical-align: middle;
                        user-select: none;
                        border: 1px solid transparent;
                        padding: .375rem .75rem;
                        font-size: 1rem;
                        line-height: 1.5;
                        border-radius: .25rem;
                        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                    }
                    div.inner .left .favBtnWrapper button:hover {
                        color: #fff;
                        background-color: #0069d9;
                        border-color: #0062cc;
                    }

                    .showsList div.show {
                        width: 100%;
                        height: 100vh;    
                        position: relative;
                        padding: 15px;
                        display: flex;
                        box-sizing: border-box;
                    }

                    .showsList div.show:not(:first-of-type) {
                        display: none;
                    }

                    .showsList img.backdrop {
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

                    .showsList img.poster {
                        display: none;
                    }

                    .showsList div.inner {
                        position: relative;
                        z-index: 1;
                        display: flex;
                        flex-flow: row wrap;
                        align-items: flex-end;
                        color: #fefefe;
                        text-shadow: 0px 0px 3px rgba(0,0,0,0.5);
                        padding: 35px;
                        padding-bottom: 65px;
                    }

                    .showsList div.inner > .left {
                        width: 60%;
                    }
                    .showsList div.inner > .right {
                        width: 40%;
                        background-color: rgba(0,0,0,0.9);
                        padding: 15px;
                        border-radius: 10px;
                    }

                    .showsList div.inner .left .genreList p {
                        float: left;
                        font-size: 16px;
                        border-radius: 3px 5px;
                        margin: 5px;
                        color: #FFF;
                        font-weight: bold;
                    }

                    .showsList div.inner .left .genreList p:first-of-type {
                        margin-left: 0;
                    }

                    .showsList div.inner .left .titleWrapper {
                        clear: left;
                    }

                    .showsList div.inner .left .titleWrapper h1 {
                        font-size: 3em;
                    }
                    
                    .showsList div.inner .right .text {
                        font-family: arial, sans-serif;
                        font-size: 16px;
                        line-height: 30px;
                        color: #ddd;
                        mix-blend-mode: difference;
                        overflow: auto;
                    }


                    #main {
                        position: relative;
                        z-index: 2;
                        background-color: #24292e;
                        display: flex;
                        flex-flow: column nowrap;
                    }

                    @media screen and (max-width: 945px){
                        .showsList div.inner > .left {
                            width: 100%;
                            margin-bottom: 15px;
                        }
                        .showsList div.inner > .right {
                            width: 100%;
                        }
                    }
                `}</style>
            </div>
            <div id="main" ref={searchResultsRefEl}>
                <Search callback={handleSearch} />
                {searchList.length !== 0 && (
                    <>
                        <div className="searchContainer">
                            <ShowsList shows={searchList} />
                        </div>
                    </>
                )}
                {!resultsFound && <h2 className="noResults">No Results Found</h2>}
                <style jsx global>{`
                    .noResults {
                        text-align: center;
                        color: #FFF;
                        margin-top: 15px;
                        padding-bottom: 45px;
                        font-size: 28px;
                    }

                    .searchWrapper {
                        padding: 20px;
                        display: flex;
                        justify-content: center;
                        text-align: center;
                    }

                    .searchWrapper form label {
                        color: #fff;
                    }

                    .searchWrapper form input[type=search] {
                        background-color: transparent;
                        border: none;
                        border-bottom: 1px solid #fff;
                        padding: 10px 8px;
                        outline: none;
                        color: #fff;
                        margin: 5px 10px;
                        font-size: 18px;
                        border-radius: 3px;
                    }

                    .searchWrapper form input[type=submit] {
                        background-color: #007bff;
                        margin-top: 5px;
                        cursor: pointer;
                        color: #fff;
                        font-weight: 400;
                        text-align: center;
                        white-space: nowrap;
                        vertical-align: middle;
                        user-select: none;
                        border: 1px solid transparent;
                        padding: .375rem .75rem;
                        font-size: 1rem;
                        line-height: 1.5;
                        border-radius: .25rem;
                        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                    }

                    .searchContainer {
                        display: flex;
                        flex-flow: row wrap;
                        padding: 20px;
                        max-width: 1280px;
                        justify-content: center;
                        margin: 0 auto;
                    }

                    .searchContainer .show {
                        width: 200px;
                        min-height: 430px;
                        margin-bottom: 35px;
                        padding: 5px;
                        font-size: 16px;
                        margin: 5px;
                    }

                    .searchContainer img.backdrop {
                        display: none;
                    }
                    .searchContainer img.poster {
                        border-radius: 5px;
                        width: 100%;
                        height: 285px;
                        object-fit: cover;
                    }

                    .searchContainer .left {
                        font-family: 'Ubuntu', sans-serif;
                        color: #fff;
                    }

                    .searchContainer .left .titleWrapper h1 {
                        font-size: 18px;
                        margin: 8px 0;
                    }

                    .searchContainer .left .genreList p:not(:first-of-type){
                        display: none;
                    }

                    .searchContainer .right {
                        display: none;
                    }                    
                `}</style>
            </div>
        </MainLayout>
    )
};

Index.getInitialProps = async (context) => {
    try {
        const data = await getPopular(context.req);
        const isUser = await verify(context);
        console.log({ isUser });

        return { shows: data };
    } catch (ex) {
        return { shows: [] };
    }
};

export default Index;