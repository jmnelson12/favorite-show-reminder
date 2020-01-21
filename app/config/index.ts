import dotenv from 'dotenv';
import path from 'path';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = dotenv.config({ path: path.resolve(__dirname, '../../.env') });
if (!env) {
    throw new Error("Couldn't find .env file");
}

const isDev = process.env.NODE_ENV !== 'production';
const _whitelist = isDev ? 'DEV_WHITELIST' : 'PROD_WHITELIST';

const concurrency: string = process.env.AGENDA_CONCURRENCY || "2";
const dbURL: string = process.env.MLAB_TASK_COLLECTION_URI || "";

export default {
    TMDB_KEY: process.env.TMDB_KEY,
    PORT: process.env.PORT,
    databaseURL: dbURL,
    api: {
        prefix: '/api',
    },
    whitelist: process.env[_whitelist]?.split(','),
    agenda: {
        dbCollection: process.env.AGENDA_DB_COLLECTION,
        pooltime: process.env.AGENDA_POOL_TIME,
        concurrency: parseInt(concurrency, 10),
    },
    agendash: {
        user: process.env.AGENDASH_USER || "admin",
        password: process.env.AGENDASH_PWORD || "password"
    },
    removePostPWORD: process.env.REMOVE_POST_PWORD
}