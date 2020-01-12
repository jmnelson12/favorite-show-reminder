import { getRequest, postRequest } from '../utils/index';
import * as auth from '../utils/auth';
const defaultErrorEnding = "Please refresh the page and try again.";

export async function register() {
    const endpoint = 'api/user/register';
};
export async function login() {
    const endpoint = 'api/user/login';
};
export async function verify(ctx: any, token: string = '') {
    const endpoint = 'api/user/verify';

    // const loginOptions = {
    //     token: "bWFpbEBqYWNvYm5lbHNvbi50ZWNo-b21515db-1986-4dfa-b018-26222b6fad41",
    //     cookieOptions: { expires: 1 }
    // };
    // auth.login(loginOptions);

    const _token = token ? token : auth.getToken(ctx);

    if (!_token) {
        return false;
    }

    const isVerified = await getRequest(endpoint, null, { headers: { token: _token } });

    return isVerified;
};
export async function logout() {
    const endpoint = 'api/user/logout';

};