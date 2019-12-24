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
        name: "About",
        link: "/about"
    }
];

const Layout: React.FunctionComponent<Props> = ({
    children,
    title = "Favorite Show Reminder"
}) => (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <main className="container">
                <style jsx global>{`
                    html {
                        height: 100%;
                        box-sizing: border-box;
                    }
                    
                    *,
                    *:before,
                    *:after {
                        box-sizing: inherit;
                    }

                    body { 
                        position: relative;
                        margin: 0;
                        /* padding-bottom: 6rem;*/
                        min-height: 100%;
                    }
                `}</style>

                <style jsx>{`
                    footer {
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        padding: 0.5rem;
                        background-color: #efefef;
                        text-align: right;
                    }
                    nav img {
                        width: 50px;
                        height: 15px;
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
                {children}

            </main>
        </>
    );

export default Layout;