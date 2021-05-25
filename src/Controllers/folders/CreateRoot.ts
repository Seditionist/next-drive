import { FastifyInstance, FastifyRequest } from "fastify";

import { Folder } from "../../Repositories/FolderRepository";

interface IRequest {
	name: string
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/createroot", {
		schema: {
			tags: ["Folder"],
			body: {
				type: "object",
				properties: {
					name: { type: "string" }
				}
			},
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						status: { type: "number" },
						data: { type: "boolean" }
					}
				}
			}
		}
	}, async (req: FastifyRequest) => {
		try {
			const { name } = req.body as IRequest;

			return {
				ok: true,
				status: 200,
				data: await Folder.InsertRoot(name)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};