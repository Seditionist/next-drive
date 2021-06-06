import { FastifyInstance } from "fastify";

import { Folder } from "../../Repositories/FolderRepository";
import { FolderSchema } from "../../Types/Schemas/Generic";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/getfolders/", {
		schema: {
			tags: ["Folder"],
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
	}, async () => {
		try {
			return {
				ok: true,
				status: 200,
				data: await Folder.GetRootFolders()
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};