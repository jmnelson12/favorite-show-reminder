import { getRequest } from '../utils/index';

export async function getPopular(req: any = null) {
    const endpoint = 'api/tmdb/popular';

    const { data }: any = await getRequest(endpoint, req);

    return data;
};

export async function runSearch(query: string = "") {
    const endpoint = `api/tmdb/search?query=${query}`;

    const { data }: any = await getRequest(endpoint);

    return data;
};