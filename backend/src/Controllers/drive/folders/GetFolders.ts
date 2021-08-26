import { FastifyInstance } from "fastify";

import { Folder } from "@Repo/FolderRepository";
import { IRequestContext } from "@/Types/Abstracts";
import { FolderSchema } from "@/Types/Schemas/Generic";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get<IRequestContext>("/getfolders/:uid", {
		schema: {
			tags: ["Folder"],
			params: {
				type: ["object"],
				properties: {
					uid: {
						type: "string",
						require: true
					}
				}
			},
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						status: { type: "number" },
						data: {
							type: "array",
							items: FolderSchema
						}
					}
				}
			}
		}
	}, async (req) => {
		try {
			const { uid } = req.params;

			return {
				ok: true,
				status: 200,
				data: await Folder.GetSubFolders(uid)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};