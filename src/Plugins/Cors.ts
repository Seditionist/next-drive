import plugin from "fastify-plugin";
import cors from "fastify-cors";
import { FastifyInstance } from "fastify";

// import { Config } from "../Utilities/Config";

export default plugin(async (fastify: FastifyInstance): Promise<void> => {
	fastify.register(cors, {
		allowedHeaders: ["APPCODE", "APPTOKEN", "Authorization"],
		exposedHeaders: ["Authorization"],
		origin: false,
		credentials: true,
		preflightContinue: false,
		preflight: false
	});
});