import { FastifyInstance } from "fastify";

import { FileSchema } from "@/Types/Schemas/Generic";
import { File } from "@Repo/FileRepository";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/getfiles/", {
		schema: {
			tags: ["Drive/File"],
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
	}, async () => {
		try {
			return {
				ok: true,
				status: 200,
				data: await File.GetRootFiles()
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};