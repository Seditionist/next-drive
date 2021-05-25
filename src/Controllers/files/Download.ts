import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { File } from "../../Repositories/FileRepository";
import { Generic } from "../../Utilities/Generic";

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
	}, async (req: FastifyRequest, res: FastifyReply) => {
		try {
			const { uid } = req.params as IRequest;
			if (!uid) throw "no uid specified";

			const file = await File.GetFile(uid);

			const buffer = Generic.Base64ToBuffer(file.FileContents);

			res.header("Content-Disposition", `attachment; filename=${file.FileName}${file.FileExtension}`);
			res.type(file.FileContentType);
			return res.send(buffer);
		} catch (error) {
			throw new Error(error);
		}
	});
};