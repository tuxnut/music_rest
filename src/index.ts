import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { databaseConfiguration } from './utils/DatabaseOptions';
import './utils/dotenv';
import express from 'express';
import * as fs from 'fs';
import * as https from 'https';
import * as bodyParser from 'body-parser';
import { RegisterRoutes } from "./routes/routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './api/swagger.json';

createConnection(databaseConfiguration).then(async (_connection: Connection) => {

    console.log("Connected to Database !")

    const credentials = { 
        key: fs.readFileSync("./src/cert/key.pem"), 
        cert: fs.readFileSync("./src/cert/cert.pem") 
    };

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    const port = process.env.APP_PORT;

    RegisterRoutes(app);

    const httpsServer: https.Server = https.createServer(credentials, app);

    // Replace app by the httpsServer when certificates are verified
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });

}).catch(err => console.error(err));
