export enum ShowType {
    Movie = "Movie",
    TV_Show = "TV Show",
    Blank = ""
};

export type Genre = {
    id: number;
    name: string;
};

export interface IShow {
    popularity: number;
    voteCount: number;
    posterPath: string;
    id: number;
    backdropPath: string;
    genres: Genre[] | null;
    title: string;
    voteAverage: number;
    overview: string;
    releaseDate: string;
    type?: ShowType;
};