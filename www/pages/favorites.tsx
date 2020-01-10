import { NextPage } from "next";
import Router from 'next/router';
import { getFavorites } from '../api/favorites';

import MainLayout from "../components/MainLayout";
import FavoriteShowsList from "../components/FavoriteShowsList";

type Props = {
    data: any;
};

const Favorites: NextPage<Props> = ({ data }) => (
    <MainLayout title="Index Page">
        <FavoriteShowsList shows={data} />
    </MainLayout>
);

Favorites.getInitialProps = async (context) => {
    try {
        const { data, status } = await getFavorites(context.req);

        if (status !== 200) {
            Router.push('/auth');
            return { data: [] };
        }

        return { data };
    } catch (ex) {
        return { data: [] };
    }
};


export default Favorites;