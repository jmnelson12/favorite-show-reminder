import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = dotenv.config();
if (!env) {
    throw new Error("Couldn't find .env file");
}

const isDev = process.env.NODE_ENV !== 'production';
const _whitelist = isDev ? 'DEV_WHITELIST' : 'PROD_WHITELIST';

export default {
    TMDB_KEY: process.env.TMDB_KEY,
    PORT: process.env.PORT,
    api: {
        prefix: '/api',
    },
    jwtSecret: process.env.JWT_SECRET,
    whitelist: process.env[_whitelist]?.split(',')
}