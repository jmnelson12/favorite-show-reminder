import nextCookie from 'next-cookies'
import cookie from "js-cookie";

export const getToken = (ctx: any) => {
    const { token } = nextCookie(ctx);

    console.log(nextCookie(ctx));

    return token;
}

export const login = ({ token, cookieOptions, callback }: { token: string, cookieOptions: any, callback: Function }) => {
    cookie.set('token', token, cookieOptions);
    callback();
};

export const logout = (callback: Function) => {
    cookie.remove('token')
    // to support logging out from all windows
    window.localStorage.setItem('logout', Date.now().toString());
    callback()
}