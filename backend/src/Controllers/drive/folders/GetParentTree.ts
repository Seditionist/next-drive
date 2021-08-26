import { FastifyInstance } from "fastify";

import { Folder } from "@Repo/FolderRepository";
import { IRequestContext } from "@/Types/Abstracts";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.get<IRequestContext>("/getparenttree/:uid", {
		schema: {
			tags: ["Drive/Folder"],
			params: {
				type: ["object"],
				required: ["uid"],
				properties: {
					uid: {
						type: "string",
						require: true
					}
				}
			}
		}
	}, async (req) => {
		try {
			const { uid } = req.params;

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