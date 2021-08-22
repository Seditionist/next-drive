import { FastifyInstance, FastifyRequest } from "fastify";

import { SuccessSchema } from "../../Types/Schemas/Generic";
import { File } from "../../Repositories/FileRepository";

interface IRequest {
	uid: string
	name: string
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/rename", {
		schema: {
			tags: ["File"],
			body: {
				type: "object",
				properties: {
					uid: { type: "string" },
					name: { type: "string" }
				}
			},
			response: SuccessSchema
		}
	}, async (req: FastifyRequest) => {
		try {
			const { uid, name } = req.body as IRequest;
			return {
				ok: true,
				status: 200,
				data: await File.Rename(uid, name)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};