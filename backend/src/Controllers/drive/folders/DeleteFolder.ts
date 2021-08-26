import { FastifyInstance } from "fastify";

import { SuccessSchema } from "@/Types/Schemas/Generic";
import { Folder } from "@Repo/FolderRepository";
import { IRequestContext } from "@/Types/Abstracts";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.delete<IRequestContext>("/delete", {
		schema: {
			tags: ["Drive/Folder"],
			body: {
				type: "object",
				properties: {
					uid: { type: "string" }
				}
			},
			response: SuccessSchema
		}
	}, async (req) => {
		try {
			const { uid } = req.body;

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