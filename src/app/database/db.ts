import { ConnectionOptions, createConnection } from "typeorm";
import { checkEnv } from "../../utils/env";

export class DB {

    /**
     * Initialize db
     *
     * @static
     * @returns {Promise<void>}
     */
    public static async initialize(): Promise<void> {

        const host = checkEnv("DB_HOST");
        const port = parseInt(checkEnv("DB_PORT"));
        const username = checkEnv("DB_USERNAME");
        const password = checkEnv("DB_PASSWORD");
        const database = checkEnv("DB_DATABASE");

        const connectionOptions: ConnectionOptions = {
            type: "postgres",
            synchronize: true,
            host,
            port,
            username,
            password,
            database,
            entities: [
                `${__dirname}/../entity/**/*.js`
            ]
        };

        try {
            await createConnection(connectionOptions);
        } catch (error) {
            console.log(`[DB] [INITIALIZE] failed to connect to database - ${error.message}`);
            throw error;
        }
    };
}

