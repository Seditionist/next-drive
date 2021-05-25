import { FastifyInstance, FastifyRequest } from "fastify";

import { Folder } from "../../Repositories/FolderRepository";

interface IRequest {
	uid: string
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.delete("/delete", {
		schema: {
			tags: ["Folder"],
			body: {
				type: "object",
				properties: {
					uid: { type: "string" }
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
			const { uid } = req.body as IRequest;

			return {
				ok: true,
				status: 200,
				data: await Folder.Delete(uid)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};