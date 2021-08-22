import { FastifyInstance, FastifyRequest } from "fastify";

import { SuccessSchema } from "../../Types/Schemas/Generic";
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
			response: SuccessSchema
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