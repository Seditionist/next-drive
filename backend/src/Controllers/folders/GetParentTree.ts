import { FastifyInstance, FastifyRequest } from "fastify";

import { Folder } from "../../Repositories/FolderRepository";
// import { FolderSchema } from "../../Types/Schemas/Generic";

interface IRequest {
	uid: string
}

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/getparenttree/:uid", {
		schema: {
			tags: ["Folder"],
			params: {
				type: ["object"],
				required: ["uid"],
				properties: {
					uid: {
						type: "string",
						require: true
					}
				}
			},
			// response: {
			// 	200: {
			// 		type: "object",
			// 		properties: {
			// 			ok: { type: "boolean" },
			// 			status: { type: "number" },
			// 			data: {
			// 				type: "array",
			// 				items: FolderSchema
			// 			}
			// 		}
			// 	}
			// }
		}
	}, async (req: FastifyRequest) => {
		try {
			const { uid } = req.params as IRequest;

			return {
				ok: true,
				status: 200,
				data: await Folder.GetParentTree(uid)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};