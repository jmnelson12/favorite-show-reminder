import dotenv from 'dotenv';

const env = dotenv.config();

if (!env) {
    throw new Error("Couldn't find .env file");
}

export default {
    TMDB_KEY: process.env.TMDB_KEY
}