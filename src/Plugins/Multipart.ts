import plugin from "fastify-plugin";
import multipart from "fastify-multipart";
import { FastifyInstance } from "fastify";

export default plugin(async (fastify: FastifyInstance): Promise<void> => {
	fastify.register(multipart, {
		limits: {
			fieldNameSize: 100,
			fieldSize: 1000000,
			fields: 10,
			fileSize: 20 * 1024 * 1024,
			files: 1,
			headerPairs: 2000
		},
		addToBody: true
	});
});