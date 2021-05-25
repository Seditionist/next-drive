import plugin from "fastify-plugin";
import swagger from "fastify-swagger";
import { FastifyInstance } from "fastify";

export default plugin(async (fastify: FastifyInstance): Promise<void> => {
	fastify.register(swagger, {
		routePrefix: "/api/docs",
		swagger: {
			info: {
				title: "Next.Js Drive Api",
				description: "some api",
				version: "v1"
			},
			schemes: ["http"],
			consumes: ["application/json", "multipart/form-data"],
			produces: ["application/json"],
			tags: [
				{ name: "Folder", description: "Folder related endpoints" },
				{ name: "File", description: "File related endpoints" }
			]
		},
		exposeRoute: true
	});
});