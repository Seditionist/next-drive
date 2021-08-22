import debug from "debug";
import { ConnectionOptions, IDatabaseDriver, EntityManager, Connection, MikroORM } from "@mikro-orm/core";
import { cwd } from "process";
import path from "path";

import { Config } from "../Utilities/Config";

export class Database {
	private static logSystem = debug("next-drive:db:system");
	private static logEvent = debug("next-drive:db:event");
	private static logError = debug("next-drive:db:error");

	private static orm: MikroORM<IDatabaseDriver<Connection>>

	public static Repo: EntityManager<IDatabaseDriver<Connection>>

	private static readonly ormconfig = {
		debug: Config.Options.IS_PROD,
		type: Config.Database.DB_TYPE,
		port: Config.Database.DB_PORT,
		user: Config.Database.DB_USER,
		password: Config.Database.DB_PASSWORD,
		dbName: Config.Database.DB_NAME,
		entities: [path.join(cwd(), "build/Models/**/*.js")],
		entitiesTs: [path.join(cwd(), "src/Models/**/*.ts")],
		cache: {
			enabled: true,
			pretty: !Config.Options.IS_PROD,
			options: { cacheDir: cwd() + "__db_cache__" }
		}
	} as ConnectionOptions;

	public static async Connect(): Promise<void> {

		Database.logSystem("Connecting to db...");

		try {
			Database.orm = await MikroORM.init(Database.ormconfig);
			const { em } = Database.orm;
			Database.Repo = em;
			Database.logSystem("successfully connected to database");
		} catch (e) {
			Database.logError(`error connecting to database ${e}`);
		}
	}

	public static async Close(): Promise<void> {
		try {
			await Database.orm.close();
			Database.logEvent("Closed database connection.");
		} catch (error) {
			throw Error(error);
		}
	}
}