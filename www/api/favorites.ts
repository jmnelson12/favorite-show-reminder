import { getRequest, postRequest, deleteRequest } from '../utils/index';
const endpoint = 'api/user/favorites';

export async function getFavorites(req: any = null) {
    const { data, status }: any = await getRequest(endpoint, req);

    return { data, status };
};

export async function addToFavorites(id: number, type: string | undefined = "") {
    try {
        const res = await postRequest(endpoint, {
            id,
            type
        });
    } catch (ex) {
        console.error(`${ex.message}`);
    }
};

export async function removeFromFavorites(id: number) {
    try {
        const { data } = await deleteRequest(`${endpoint}/${id}`);
        return data;
    } catch (ex) {
        console.error(`${ex.message}`);
        return null;
    }
}