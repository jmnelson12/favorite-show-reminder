import express from "express";
import config from "./config";

const startServer = async () => {
    const server = express();

    await require('./loaders').default({ server });

    server.listen(config.PORT, () => console.log(`> Server running on port: ${config.PORT}.`));

};
startServer();