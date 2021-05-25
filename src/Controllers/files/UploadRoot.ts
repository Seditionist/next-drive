import path from "path";
import { FastifyInstance, FastifyRequest } from "fastify";

import { File } from "../../Repositories/FileRepository";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/uploadroot", {
		schema: {
			tags: ["File"],
			consumes: ["multipart/form-data"],
			response: {
				200: {
					type: "object",
					properties: {
						ok: { type: "boolean" },
						status: { type: "number" },
						data: { type: "boolean" }
					}
				}
			}
		}
	}, async (req: FastifyRequest) => {
		try {
			const data = await req.file();
			if (!data) throw "no file uploaded";

			const extension = path.extname(data.filename);
			const filename = path.basename(data.filename, extension);

			return {
				ok: true,
				status: 200,
				data: await File.InsertRoot({
					filename,
					extension,
					contentType: data.mimetype,
					contents: await data.toBuffer()
				})
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};