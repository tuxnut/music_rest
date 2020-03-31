import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { databaseConfiguration } from './utils/DatabaseOptions';
import './utils/dotenv';
import express from 'express';
import * as bodyParser from 'body-parser';
import { RegisterRoutes } from "./routes/routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './api/swagger.json';

createConnection(databaseConfiguration).then(async (_connection: Connection) => {

    console.log("Connected to Database !")

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    const port = process.env.APP_PORT;

    RegisterRoutes(app);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });

}).catch(err => console.error(err));
