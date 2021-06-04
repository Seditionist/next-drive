import path from "path";
import { FastifyInstance, FastifyRequest } from "fastify";

import { File } from "../../Repositories/FileRepository";

interface BodyEntry {
	data: Buffer,
	filename: string,
	encoding: string,
	mimetype: string,
	limit: false
}

interface IRequest {
	uid: string
	files: BodyEntry[]
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/uploadsub", {
		schema: {
			tags: ["File"],
			consumes: ["multipart/form-data"],
			body: {
				type: "object",
				properties: {
					uid: { type: "string" },
					files: { isFileType: true }
				}
			},
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
			const { uid, files } = req.body as IRequest;

			if (!files[0]) throw "blah";

			const file = files[0];
			if (!file) throw "no file uploaded";

			const extension = path.extname(file.filename);
			const filename = path.basename(file.filename, extension);

			return {
				ok: true,
				status: 200,
				data: await File.InsertSub(uid, {
					filename,
					extension,
					contentType: file.mimetype,
					contents: file.data
				})
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};