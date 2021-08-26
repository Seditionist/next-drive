import { FastifyInstance } from "fastify";

import { Folder } from "../../Repositories/FolderRepository";
import { SuccessSchema } from "../../Types/Schemas/Generic";
import { IRequestContext } from "../../Types/Abstracts";


export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post<IRequestContext>("/move", {
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
	}, async (req) => {
		try {
			const { uid, parent } = req.body;
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