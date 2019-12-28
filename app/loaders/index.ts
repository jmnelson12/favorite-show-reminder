import express from 'express';
import expressLoader from './express';

export default async ({ server }: { server: express.Application }) => {
    await expressLoader({ server });
    console.log(`Info: Express Loaded`);
};