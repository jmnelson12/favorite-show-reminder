import * as React from 'react';
import { IShow } from '../../interfaces';

import FavTVList from "./FavTVList";
import FavMovieList from './FavMovieList';

type Props = {
    shows: any
};

const FavoriteShowsList: React.FunctionComponent<Props> = ({ shows }) => {
    const tvShows: IShow[] | null = shows?.filter((show: IShow) => show.type === "TV Show");
    const movies: IShow[] | null = shows?.filter((show: IShow) => show.type === "Movie");

    return (
        <>
            {tvShows && <FavTVList shows={tvShows} />}
            {movies && <FavMovieList movies={movies} />}

            <style jsx global>{`
                .listContainer {
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: center;
                    margin: 10px 0;
                }

                h1 {
                    color: #FEFEFE;
                }

                .show {
                    width: 20%;
                    min-width: 275px;
                    max-width: 537px;
                    margin: 15px 5px;
                    color: #FEFEFE;
                    position: relative;
                    cursor: pointer;
                    transition: transform 0.6s ease;
                }

                .show img {
                    width: 100%;
                }

                .details {
                    display: none;

                    position: absolute;
                    z-index: 3;
                    background-color: #FFF;
                    box-sizing: border-box;
                    padding: 15px 25px;
                    color: #222;
                    margin-top: -7px;
                }

                .overviewWrapper {
                    margin: 10px 0;
                    font-weight: bold;
                }

                .overview {
                    font-weight: 200;
                    color: rgb(107, 119, 144);
                    font-family: Helvetica, Arial, sans-serif;
                }

                .show:hover {
                    transform: scale(1.2);
                    z-index: 2;
                }

                .show:hover > .released,
                .show:hover > .title {
                    display: none;
                }

                .show:hover .details {
                    display: block;
                }

                .actions {
                    display: flex;
                    justify-content: space-evenly;
                }

                .actions button {
                    background-color: #007bff;
                    cursor: pointer;
                    color: #fff;
                    font-weight: 400;
                    text-align: center;
                    white-space: nowrap;
                    vertical-align: middle;
                    user-select: none;
                    border: 1px solid transparent;
                    padding: .375rem .75rem;
                    font-size: 14px;
                    line-height: 1.5;
                    border-radius: .25rem;
                    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;                
                }

                .actions button:hover {
                    color: #fff;
                    background-color: #0069d9;
                    border-color: #0062cc;
                }

                .actions button.btnRemove {
                    background-color: #dc3545;
                }
                .actions button.btnRemind {
                    background-color: #28a745;
                }
            `}</style>
        </>
    );
};

export default FavoriteShowsList;