export interface IMovie {
    popularity: number;
    voteCount: number;
    posterPath: string;
    id: number;
    backdropPath: string;
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