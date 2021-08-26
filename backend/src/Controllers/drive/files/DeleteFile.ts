import { FastifyInstance } from "fastify";

import { SuccessSchema } from "@/Types/Schemas/Generic";
import { File } from "@Repo/FileRepository";
import { IRequestContext } from "@/Types/Abstracts";

export default async (fastify: FastifyInstance): Promise<void> => {
	fastify.delete<IRequestContext>("/delete", {
		schema: {
			tags: ["Drive/File"],
			body: {
				type: "object",
				properties: {
					uid: { type: "string" }
				}
			},
			response: SuccessSchema
		}
	}, async (req) => {
		try {
			const { uid } = req.body;
			return {
				ok: true,
				status: 200,
				data: await File.Delete(uid)
			};
		} catch (error) {
			throw new Error(error);
		}
	});
};