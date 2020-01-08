import { getRequest } from '../utils/index';

export async function getFavorites(req: any = null) {
    const endpoint = 'api/user/favorites';

    const { data, status }: any = await getRequest(endpoint, req);

    return { data, status };
};