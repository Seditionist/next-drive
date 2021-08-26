import plugin from "fastify-plugin";
import swagger from "fastify-swagger";
import { FastifyInstance } from "fastify";

export default plugin(async (fastify: FastifyInstance): Promise<void> => {
	fastify.register(swagger, {
		routePrefix: "/api/docs",
		swagger: {
			info: {
				title: "Next.Js Drive Api",
				description: "documentation for directory management api",
				version: "v1"
			},
			schemes: ["http"],
			consumes: ["application/json", "multipart/form-data"],
			produces: ["application/json"],
			tags: [
				{ name: "Drive/Folder", description: "Next Drive - Folder related endpoints" },
				{ name: "Drive/File", description: "Next Drive - File related endpoints" }
			]
		},
		exposeRoute: true
	});
});