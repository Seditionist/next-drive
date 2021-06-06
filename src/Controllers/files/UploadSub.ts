import path from "path";
import { FastifyInstance, FastifyRequest } from "fastify";

import { File } from "../../Repositories/FileRepository";
import { SuccessSchema } from "../../Types/Schemas/Generic";

interface IRequest {
	uid: string
	files: IBodyEntry[]
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
			response: SuccessSchema
		}
	}, async (req: FastifyRequest) => {
		try {
			const { uid, files } = req.body as IRequest;

			if (!files[0]) throw "no file uploaded";

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