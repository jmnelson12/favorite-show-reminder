import * as React from 'react';
import Link from "next/link";
import Head from 'next/head'

type Props = {
    title?: string
};

const pages = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "Favorites",
        link: "/favorites"
    }
];

const MainLayout: React.FunctionComponent<Props> = ({
    children,
    title = "Favorite Show Reminder"
}) => (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <main>
                <style jsx global>{`
                    @import url(//db.onlinewebfonts.com/c/dd4320757ff990fa3d23662f08aa6f3a?family=CentralW01);
                    
                    html {
                        height: 100%;
                        box-sizing: border-box;
                        font-family: "CentralW01", Arial, sans-serif;
                    }
                    
                    *,
                    *:before,
                    *:after {
                        box-sizing: inherit;
                        margin: 0;
                        padding: 0;
                    }

                    body { 
                        position: relative;
                        margin: 0;
                        padding: 0;
                        min-height: 100%;
                        background-color: #24292e;
                    }
                `}</style>

                <style jsx>{`
                    nav {
                        position: fixed;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        height: 100%;
                        display: flex;
                        flex-flow: column nowrap;
                        z-index: 999;
                        background-color: rgba(75,75,75,0.3);
                        width: 125px;
                    }
                    nav img {
                        width: 50px;
                        height: 15px;
                    }

                    .container {
                        padding-left: 125px;
                    }

                    @media screen and (max-width: 945px){
                        nav {
                            bottom: unset;
                            right: 0;
                            width: 100%;
                            height: 35px;
                            flex-flow: row wrap;
                        }
                        .container {
                            padding: 0;
                        }
                    }
                `}</style>

                <nav>
                    {
                        pages.map(page => (
                            <Link href={page.link} key={page.name}>
                                <a title={page.name}>{page.name}</a>
                            </Link>
                        ))
                    }
                    <img src="/images/tmdb-rectangle-green.svg" alt="tmdb attribution" />
                </nav>
                <div className="container">
                    {children}
                </div>
            </main>
        </>
    );

export default MainLayout;