import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from "js-cookie";

export const auth = ({ context, callback, serverRedirect }: { context: any, callback: Function, serverRedirect: string }) => {
    const { token } = nextCookie(context)

    if (context.req && !token && serverRedirect) {
        context.res.writeHead(302, { Location: serverRedirect })
        context.res.end()
        return
    }

    if (!token) {
        callback()
    }

    return token
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