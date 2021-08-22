import { FastifyInstance, FastifyRequest } from "fastify";

import { Folder } from "../../Repositories/FolderRepository";
import { SuccessSchema } from "../../Types/Schemas/Generic";

interface IRequest {
	uid: string,
	parent: string
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/move", {
		schema: {
			tags: ["Folder"],
			body: {
				type: "object",
				required: ["uid"],
				properties: {
					uid: { type: "string" },
					parent: { type: "string" },
				}
			},
			response: {
				200: {
					type: "object",
					properties: SuccessSchema
				}
			}
		}
	}, async (req: FastifyRequest) => {
		try {
			const { uid, parent } = req.body as IRequest;
			return {
				ok: true,
				status: 200,
				data: await Folder.MoveFolder(uid, parent)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};