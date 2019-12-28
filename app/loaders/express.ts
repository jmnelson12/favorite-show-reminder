import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import routes from '../api';
import config from '../config';

export default ({ server }: { server: express.Application }) => {
    server.use(cors());
    server.use(helmet());

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.use(config.api.prefix, routes());
};