import { FastifyInstance } from "fastify";

import { Folder } from "@Repo/FolderRepository";
import { SuccessSchema } from "@/Types/Schemas/Generic";
import { IRequestContext } from "@/Types/Abstracts";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post<IRequestContext>("/rename", {
		schema: {
			tags: ["Folder"],
			body: {
				type: "object",
				required: ["uid"],
				properties: {
					uid: { type: "string" },
					name: { type: "string" },
				}
			},
			response: {
				200: {
					type: "object",
					properties: SuccessSchema
				}
			}
		}
	}, async (req) => {
		try {
			const { uid, name } = req.body;
			return {
				ok: true,
				status: 200,
				data: await Folder.Rename(uid, name)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};