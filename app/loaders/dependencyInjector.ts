import { Container } from 'typedi';
import agenda from './agenda';

export default ({ mongoConnection, models }: { mongoConnection: any; models: { name: string; model: any }[] }) => {
    try {
        models.forEach(m => {
            Container.set(m.name, m.model);
        });

        const agendaInstance = agenda({ mongoConnection });
        
        Container.set('agendaInstance', agendaInstance);
        console.log('Agenda injected into container');

        return { agenda: agendaInstance };
    } catch (e) {
        console.log(' Error on dependency injector loader: %o', e);
        throw e;
    }
}