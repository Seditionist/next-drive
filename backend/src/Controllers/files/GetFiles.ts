import { FastifyInstance } from "fastify";

import { FileSchema } from "../../Types/Schemas/Generic";
import { File } from "../../Repositories/FileRepository";
import { IRequestContext } from "../../Types/Abstracts";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get<IRequestContext>("/getfiles/:uid", {
		schema: {
			tags: ["File"],
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
							items: FileSchema
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
				data: await File.GetFolderFiles(uid)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};