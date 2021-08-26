import { FastifyInstance } from "fastify";

import { SuccessSchema } from "@/Types/Schemas/Generic";
import { File } from "@Repo/FileRepository";
import { IRequestContext } from "@/Types/Abstracts";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post<IRequestContext>("/move", {
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
	}, async (req) => {
		try {
			const { uid, folder } = req.params;
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