import { NextPage } from "next";
import axios from "axios";
import url from "url";

import MainLayout from "../components/MainLayout";

const absoluteUrl = (req: any, setLocalhost: any) => {
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
    })
};

type Props = {
    foo: any
};

const Favorites: NextPage<Props> = ({ foo }) => (
    <MainLayout title="Index Page">
        <h1>Favorites Page</h1>
    </MainLayout>
);

Favorites.getInitialProps = async ({ req }) => {
    const baseUrl = absoluteUrl(req, 'localhost:8080');
    const apiUrl = process.env.NODE_ENV === 'production' ? `${baseUrl}api/user/favorites` : 'http://localhost:8080/api/user/favorites';

    try {
        const { status, data } = await axios.get(apiUrl);

        console.log({ status, data });

        return { foo: "bar" };
    } catch (ex) {
        console.error(`Error fetching data from ${apiUrl} - ${ex.message}`);
        return { foo: "bar" };
    }
};


export default Favorites;