import { NextApiRequest, NextApiResponse } from "next";

import { Requests } from "../../Services/Requests";
import { Generic } from "../../Services/Generic";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	try {
		if(req.method != "GET") throw "method not allowed";
		const { uid } = req.query;
		const { data }  = await Requests.Get(`files/download/${uid}`);

		const buffer = Generic.Base64ToBuffer(data.contents);

		res.setHeader("Content-Disposition", `attachment; filename=${data.name}${data.extension}`);
		res.setHeader("Content-Type", data.type);
		res.status(200).send(buffer);
	} catch (error) {
		res.status(500).json({
			ok: false,
			error
		});
	}
};
