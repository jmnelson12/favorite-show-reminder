import * as React from 'react';
import { IShow } from '../../interfaces';
import { trimStringBasedOnWords } from '../utils/index';

type Props = {
    shows: IShow[],
    removeShow: Function
};

const FavTVList: React.FunctionComponent<Props> = ({ shows, removeShow }) => {
    return (
        <>
            <h1>Favorite TV Shows</h1>
            <div className={"listContainer"}>
                {shows.length === 0 && <p>No Favorite TV Shows</p>}
                {shows?.map((show: IShow) => (
                    <div key={show.id} className="show">
                        <img
                            src={`https://image.tmdb.org/t/p/w342${show.backdropPath}`}
                            onError={(e: any) => e.target.src = "/images/default-movie.png"}
                            alt={show.title}
                        />
                        <div className="released">Released: {show.releaseDate}</div>
                        <h2 className="title">{show.title}</h2>

                        <div className="details">
                            <div>Released: {show.releaseDate}</div>
                            <h2>{show.title}</h2>

                            <div className="overviewWrapper">
                                <p>Overview</p>
                                <p className="overview">
                                    {
                                        trimStringBasedOnWords(show.overview)
                                    }
                                </p>
                            </div>

                            <div className="actions">
                                <button className="btnRemove" onClick={() => removeShow(show.id)}>Remove</button>
                                {/* <button className="btnRemind">Remind Me</button> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
};

export default FavTVList;