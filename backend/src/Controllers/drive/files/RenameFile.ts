import { FastifyInstance } from "fastify";

import { SuccessSchema } from "@/Types/Schemas/Generic";
import { File } from "@Repo/FileRepository";
import { IRequestContext } from "@/Types/Abstracts";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post<IRequestContext>("/rename", {
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
	}, async (req) => {
		try {
			const { uid, name } = req.body;
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