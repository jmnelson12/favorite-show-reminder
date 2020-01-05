import express from 'express';
import expressLoader from './express';
import mongooseLoader from './mongoose';
import dependencyInjectorLoader from './dependencyInjector';

export default async ({ server }: { server: express.Application }) => {
    const mongoConnection = await mongooseLoader();
    console.log('DB\'s loaded and connected...');

    const userModel = {
        name: 'userModel',
        model: require('../models/User').default
    };

    const { agenda } = await dependencyInjectorLoader({
        mongoConnection,
        models: [
            userModel
        ]
    });
    console.log('Dependency Injector loaded... ');

    await expressLoader({ server });
    console.log(`Info: Express Loaded`);
};