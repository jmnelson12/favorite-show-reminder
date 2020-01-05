import { getRequest, postRequest } from '../utils/index';
const defaultErrorEnding = "Please refresh the page and try again.";

export async function register() {
    const endpoint = 'api/user/register';
};
export async function login() {
    const endpoint = 'api/user/login';
};
export async function verify(token?: string) {
    const endpoint = 'api/user/verify';
};
export async function logout() {
    const endpoint = 'api/user/logout';

};