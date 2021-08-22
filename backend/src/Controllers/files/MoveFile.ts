import { FastifyInstance, FastifyRequest } from "fastify";

import { SuccessSchema } from "../../Types/Schemas/Generic";
import { File } from "../../Repositories/FileRepository";

interface IRequest {
	uid: string
	folder: string
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/move", {
		schema: {
			tags: ["File"],
			body: {
				type: "object",
				properties: {
					uid: { type: "string" },
					folder: { type: "string" }
				}
			},
			response: SuccessSchema
		}
	}, async (req: FastifyRequest) => {
		try {
			const { uid, folder } = req.params as IRequest;
			return {
				ok: true,
				status: 200,
				data: await File.Move(uid, folder)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};