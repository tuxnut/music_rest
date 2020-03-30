import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { databaseConfiguration } from './utils/DatabaseOptions';
import './utils/dotenv';
import express from 'express';
import * as bodyParser from 'body-parser';
import { getAllComposers, getComposerByName, getMusicScoreByComposer, saveComposer, updateComposer, deleteComposer } from './handlers/ComposerRouteHandler';
import { getAllMusicScores, getMusicScoreByTitle, saveMusicScore, updateMusicScore, deleteMusicScore } from './handlers/MusicScoreRouteHandler';

createConnection(databaseConfiguration).then(async (_connection: Connection) => {

    console.log("Connected to Database !")

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    const port = process.env.APP_PORT;

    // Composer routes
    app.get('/composers', getAllComposers);

    app.get('/composers/:name', getComposerByName);
    
    app.get('/composers/:name/musicscores', getMusicScoreByComposer);

    app.post('/composers', saveComposer);

    app.put('/composers/:name', updateComposer);

    app.delete('/composers/:name', deleteComposer);

    // MusicScore routes
    app.get('/musicscores', getAllMusicScores);

    app.get('/musicscores/:title', getMusicScoreByTitle);

    app.post('/musicscores', saveMusicScore);

    app.put('/musicscores/:title', updateMusicScore);

    app.delete('/musicscores/:title', deleteMusicScore);

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });

}).catch(err => console.error(err));
