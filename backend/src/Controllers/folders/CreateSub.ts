import { FastifyInstance, FastifyRequest } from "fastify";

import { SuccessSchema } from "../../Types/Schemas/Generic";
import { Folder } from "../../Repositories/FolderRepository";

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
			response: SuccessSchema
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