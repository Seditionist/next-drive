import { FastifyInstance, FastifyRequest } from "fastify";

// import { FileSchema } from "../../Types/Schemas/Generic";
import { File } from "../../Repositories/FileRepository";

interface IRequest {
	uid: string
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/download/:uid", {
		schema: {
			tags: ["File"],
			params: {
				required: ["uid"],
				type: "object",
				properties: {
					uid: { type: "string" }
				}
			},
			// response: {
			// 	200: {
			// 		type: "object",
			// 		properties: {
			// 			ok: { type: "boolean" },
			// 			status: { type: "number" },
			// 			data: FileSchema
			// 		}
			// 	}
			// }
		}
	}, async (req: FastifyRequest) => {
		try {
			const { uid } = req.params as IRequest;
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