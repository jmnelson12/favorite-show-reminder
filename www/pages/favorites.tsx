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
        <div className="container">
            <FavoriteShowsList shows={data} />
            <style jsx>{`
                .container {
                    padding: 25px 25px 185px;
                }

                @media screen and (max-width: 945px) {                    
                    .container {
                        padding: 85px 30px 185px;
                    }
                }
            `}</style>
        </div>
    </MainLayout>
);

Favorites.getInitialProps = async (context) => {
    try {
        const { data, status } = await getFavorites(context.req);

        if (status !== 200) {
            Router.push('/');
            return { data: [] };
        }

        return { data };
    } catch (ex) {
        return { data: [] };
    }
};


export default Favorites;