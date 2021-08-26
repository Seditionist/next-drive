import { FastifyInstance } from "fastify";

import { SuccessSchema } from "@/Types/Schemas/Generic";
import { Folder } from "@Repo/FolderRepository";
import { IRequestContext } from "@/Types/Abstracts";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post<IRequestContext>("/createroot", {
		schema: {
			tags: ["Drive/Folder"],
			body: {
				type: "object",
				properties: {
					name: { type: "string" }
				}
			},
			response: SuccessSchema
		}
	}, async (req) => {
		try {
			const { name } = req.body;

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