import { FastifyInstance, FastifyRequest } from "fastify";

import { Folder } from "../../Repositories/FolderRepository";

interface IRequest {
	uid: string
}

const FolderSchema = {

};

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get("/getfolders/:uid?", {
		schema: {
			params: {
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
						data: {
							type: "array",
							items: {
								type: "array",
								items: FolderSchema
							}
						}
					}
				}
			}
		}
	}, async (req: FastifyRequest) => {
		try {
			const { uid } = req.params as IRequest;
			return {
				ok: true,
				status: 200,
				data: await Folder.GetFolders(uid)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};