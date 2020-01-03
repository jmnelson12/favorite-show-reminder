import { NextPage } from "next";
import { getFavorites } from '../api/user';

import MainLayout from "../components/MainLayout";
import FavoriteShowsList from "../components/FavoriteShowsList";

type Props = {
    data: any
};

const Favorites: NextPage<Props> = ({ data }) => (
    <MainLayout title="Index Page">
        <FavoriteShowsList shows={data} />
    </MainLayout>
);

Favorites.getInitialProps = async ({ req }) => {
    try {
        const data = await getFavorites(req);
        return { data };
    } catch (ex) {
        return { data: [] };
    }
};


export default Favorites;