import { FastifyInstance } from "fastify";

import { IRequestContext } from "@/Types/Abstracts";
import { File } from "@Repo/FileRepository";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get<IRequestContext>("/download/:uid", {
		schema: {
			tags: ["File"],
			params: {
				required: ["uid"],
				type: "object",
				properties: {
					uid: { type: "string" }
				}
			}
		}
	}, async (req) => {
		try {
			const { uid } = req.params;
			if (!uid) throw "no uid specified";

			const file = await File.GetFile(uid);

			return {
				contents: file.FileContents,
				name: file.FileName,
				extension: file.FileExtension,
				type: file.FileContentType
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};