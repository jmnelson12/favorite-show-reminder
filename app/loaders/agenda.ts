const Agenda = require('agenda');
const config = require('../config');

export default ({ mongoConnection }: { mongoConnection: string }) => {

    return new Agenda({
        mongo: mongoConnection,
        db: { address: config.default.agenda.dbCollection },
        processEvery: config.default.agenda.pooltime,
        maxConcurrency: config.default.agenda.concurrency
    });
}