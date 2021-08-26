import path from "path";
import { FastifyInstance } from "fastify";

import { File } from "@Repo/FileRepository";
import { SuccessSchema } from "@/Types/Schemas/Generic";
import { IRequestContext } from "@/Types/Abstracts";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.post<IRequestContext>("/uploadsub", {
		schema: {
			tags: ["Drive/File"],
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
	}, async (req) => {
		try {
			const { uid, files } = req.body;

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