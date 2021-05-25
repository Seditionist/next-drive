import { FastifyInstance, FastifyRequest } from "fastify";

import { Folder } from "../../Repositories/FolderRepository";
// import { FolderSchema } from "../../Types/Schemas/Generic";

interface IRequest {
	name: string,
	folderUID: string
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/createsub", {
		schema: {
			tags: ["Folder"],
			body: {
				type: "object",
				properties: {
					name: { type: "string" },
					folderUID: { type: "string" },
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
			const { name, folderUID } = req.body as IRequest;

			return {
				ok: true,
				status: 200,
				data: await Folder.InsertSub(folderUID, name)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};