import * as React from 'react';
import Link from "next/link";
import Head from 'next/head'
import { useRouter } from "next/router";

type Props = {
    children: any;
    title?: string;
    context?: any;
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
}) => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <main>
                <style jsx global>{`    
                    @import url('https://fonts.googleapis.com/css?family=Ubuntu|Nunito&display=swap');

                    html {
                        height: 100%;
                        box-sizing: border-box;
                        font-family: "Nunito", Arial, sans-serif;
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
                        width: 145px;
                        justify-content: center;
                        box-sizing: border-box;
                    }
                    nav img {
                        width: 100%;
                        height: 35px;
                        position: absolute;
                        bottom: 15px;
                        left: 0;
                    }
                    nav a {
                        color: #fff;
                        text-decoration: none;
                        line-height: 38px;
                        width: 100%;    
                        font-size: 18px;             
                        padding-left: 15px;    
                        font-weight: bold;
                    }

                    nav a.active {
                        border-right: 2px solid #fff;
                    }

                    nav hr {
                        width: 80%;
                        margin: 15px auto;
                        border: 0;
                        border-bottom: 1px solid #fefefe;
                    }

                    .container {
                        padding-left: 145px;
                    }

                    @media screen and (max-width: 945px){
                        nav {
                            bottom: unset;
                            right: 0;
                            width: 100%;
                            height: 55px;
                            flex-flow: row wrap;
                            justify-content: start;
                            align-items: center;
                            padding-left: 35px;
                        }

                        nav a {
                            line-height: 18px;                                
                            font-size: 18px;             
                            margin: 0 15px;
                            width: auto; 
                            padding: 0;
                        }
    
                        nav a.active {
                            border: none;
                            border-bottom: 1px solid #fff;
                        }

                        nav img {
                            width: 75px;
                            height: 30px;
                            position: absolute;
                            right: 15px;
                            left: unset;
                            top: 50%;
                            transform: translateY(-50%);
                        }

                        nav hr {
                            display: none;
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
                                <a title={page.name} className={router.pathname == page.link ? "active" : ""}>{page.name}</a>
                            </Link>
                        ))
                    }
                    <div className="otherLinks">
                        <hr />
                        <Link href="#search">
                            <a title="search">Search</a>
                        </Link>
                    </div>
                    <img src="/images/tmdb-rectangle-green.svg" alt="tmdb attribution" />
                </nav>
                <div className="container">
                    {children}
                </div>
            </main>
        </>
    )
};

export default MainLayout;