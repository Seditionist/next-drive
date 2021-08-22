import path from "path";
import { FastifyInstance, FastifyRequest } from "fastify";

import { SuccessSchema } from "../../Types/Schemas/Generic";
import { File } from "../../Repositories/FileRepository";

interface IRequest {
	files: IBodyEntry[]
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post("/uploadroot", {
		schema: {
			tags: ["File"],
			consumes: ["multipart/form-data"],
			body: {
				type: "object",
				properties: {
					files: { isFileType: true }
				}
			},
			response: SuccessSchema
		}
	}, async (req: FastifyRequest) => {
		try {
			const { files } = req.body as IRequest;
			if (!files) throw "no file uploaded";

			const file = files[0];
			if (!file) throw "no file uploaded";

			const extension = path.extname(file.filename);
			const filename = path.basename(file.filename, extension);

			return {
				ok: true,
				status: 200,
				data: await File.InsertRoot({
					filename,
					extension,
					contentType: file.mimetype,
					contents: await file.data
				})
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};