import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import api from "./routes/api";

const server = express();
const port = 8080;

server.use(cors());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(api);

server.listen(port, () => console.log(`> Server running on port: ${port}.`));