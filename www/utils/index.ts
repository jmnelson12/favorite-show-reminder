import url from 'url';
import axios from 'axios';

export const absoluteUrl = (req: any, setLocalhost: any) => {
    let protocol = 'https'
    let host = req ? req.headers.host : window.location.hostname
    if (host.indexOf('localhost') > -1) {
        if (setLocalhost) host = setLocalhost
        protocol = 'http'
    }

    return url.format({
        protocol,
        host,
        pathname: '/' // req.url
    });
};

const getCallUrl = (url: string, req: any = null): string => {
    const baseUrl = absoluteUrl(req, 'localhost:8080');
    return process.env.NODE_ENV === 'production' ? `${baseUrl}${url}` : `http://localhost:8080/${url}`;
}

export const getRequest = async (url: string, req: any = null, options?: any) => {
    try {
        const { status, data } = await axios.get(getCallUrl(url, req), options);

        return { status, data };
    } catch (ex) {
        // console.error(`Error fetching data from ${url} - ${ex.message}`);
        return ex.response;
    }
};

export const postRequest = async (url: string, body: any, req: any = null, options?: any) => {
    try {
        const { status, data } = await axios.post(getCallUrl(url, req), body, options);

        return { status, data };
    } catch (ex) {
        // console.error(`Error posting data to ${url} - ${ex.message}`);
        return ex.response;
    }
};

export const deleteRequest = async (url: string, req: any = null, options?: any) => {
    try {
        const { status, data } = await axios.delete(getCallUrl(url, req), options);

        return { status, data };
    } catch (ex) {
        // console.error(`Error posting data to ${url} - ${ex.message}`);
        return { data: ex, status: 500 };
    }
};

export const scrollToRef = (ref: any): void => {
    if (window) {
        window.scrollTo(0, ref.current.offsetTop);
    }
}

export const trimStringBasedOnWords = (str: string, trimAfter: number = 15): string => {
    return str.split(' ').slice(0, trimAfter).join(' ').concat('...');
}