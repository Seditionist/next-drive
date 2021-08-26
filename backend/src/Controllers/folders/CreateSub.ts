import { FastifyInstance } from "fastify";

import { SuccessSchema } from "@/Types/Schemas/Generic";
import { Folder } from "@Repo/FolderRepository";
import { IRequestContext } from "@/Types/Abstracts";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post<IRequestContext>("/createsub", {
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
	}, async (req) => {
		try {
			const { name, folderUID } = req.body;

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