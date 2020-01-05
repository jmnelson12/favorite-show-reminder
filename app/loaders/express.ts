import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import routes from '../api';
import config from '../config';

const corsOptions = {
    origin: function (origin: any, callback: any) {
        const whitelist = config.whitelist;
        let whitelistContainsPartOfOrigin = false;

        whitelist?.forEach(opt => {
            if (origin && origin.indexOf(opt) !== -1) {
                whitelistContainsPartOfOrigin = true;
            }
        });

        if (whitelist?.indexOf(origin) !== -1 || !origin || whitelistContainsPartOfOrigin) {
            callback(null, true);
        } else {
            console.log('---------------------------');
            console.log({ origin, whitelist: config.whitelist });
            console.log('---------------------------');
            callback(new Error('Not allowed by CORS'));
        }
    }
};

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50 // limit each IP to 50 requests per windowMs
});

export default ({ server }: { server: express.Application }) => {
    server.use(cors(corsOptions));
    server.use(helmet());

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.use(config.api.prefix, limiter);
    server.use(config.api.prefix, routes());
};