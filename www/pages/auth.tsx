import { NextPage } from "next";
import Router from 'next/router';
import { verify, login, register } from '../api/user';

import MainLayout from "../components/MainLayout";

type Props = {};

const Auth: NextPage<Props> = () => (
    <MainLayout title="Index Page">
        <h1>Auth</h1>
    </MainLayout>
);

Auth.getInitialProps = async () => {
    // const isVerified = await verify();

    // if (isVerified) {
    //     Router.push('/');
    // }
    return {};
};

export default Auth;