import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import './dotenv';

import { Composer } from "../entities/Composer";
import { Score } from "../entities/Score";

export const databaseConfiguration: PostgresConnectionOptions = {
    type: "postgres",
    host: process.env.DB_HOSTNAME,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    entities: [
        Composer,
        Score
    ]
};
