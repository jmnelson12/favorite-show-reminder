import * as React from 'react';
import { IShow } from '../../interfaces';
import { trimStringBasedOnWords } from '../utils/index';

type Props = {
    shows: IShow[]
};

const FavTVList: React.FunctionComponent<Props> = ({ shows }) => {
    return (
        <>
            <h1>Favorite TV Shows</h1>
            <div className={"listContainer"}>
                {shows?.map((show: IShow) => (
                    <>
                        <div key={show.id} className="show">
                            <img src={`https://image.tmdb.org/t/p/w342${show.backdropPath}`} alt={show.title} />
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
                                    <button className="btnRemove">Remove</button>
                                    <button className="btnRemind">Remind Me</button>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
};

export default FavTVList;