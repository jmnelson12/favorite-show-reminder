import { getRequest, postRequest } from '../utils/index';
const defaultErrorEnding = "Please refresh the page and try again.";

export async function register() {
    const endpoint = 'api/user/register';
};
export async function login() {
    const endpoint = 'api/user/login';
};
export async function verify(ctx: any, token: string = '') {
    const endpoint = 'api/user/verify';

    if (!token) {
        return false;
    }

    const isVerified = await getRequest(endpoint, null, { headers: { token } });

    console.log('verifying...');
    console.log({ isVerified });
};
export async function logout() {
    const endpoint = 'api/user/logout';

};