const agendash = require('agendash');
import basicAuth from 'express-basic-auth';
import { Container } from 'typedi';
import config from '../../config';

export default (app: any) => {
    const agendaInstance = Container.get('agendaInstance');

    app.use('/admin',
        basicAuth({
            users: {
                [config.agendash.user]: config.agendash.password,
            },
            challenge: true,
        }),
        agendash(agendaInstance)
    )
}