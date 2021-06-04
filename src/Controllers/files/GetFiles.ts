import { FastifyInstance, FastifyRequest } from "fastify";

import { FileSchema } from "../../Types/Schemas/Generic";
import { File } from "../../Repositories/FileRepository";

interface IRequest {
	uid: string
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/getfiles/:uid", {
		schema: {
			tags: ["File"],
			params: {
				type: ["object"],
				properties: {
					uid: { type: "string", require: false }
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
	}, async (req: FastifyRequest) => {
		try {
			const { uid } = req.params as IRequest;
			if (!uid)
				return {
					ok: true,
					status: 200,
					data: await File.GetRootFiles()
				};

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