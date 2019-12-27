export interface IMovie {
    popularity: number;
    voteCount: number;
    poster_path: string;
    id: number;
    backdrop_path: string;
    genreIds: number[];
    title: string;
    voteAverage: number;
    overview: string;
    releaseDate: string;
};

export interface IMovieResponse {
    page: number;
    totalResults: number;
    totalPages: number;
    results?: IMovie[];
}