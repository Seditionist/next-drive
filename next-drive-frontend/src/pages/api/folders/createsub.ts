import { NextApiRequest, NextApiResponse } from "next";

import { Requests } from "@Services/Requests";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	try {
		if(req.method != "POST") throw "method not allowed";
		const { name, folderUID } = req.body;
		const { data }  = await Requests.Post("folders/createsub", {name, folderUID});

		res.status(200).send(data);
	} catch (error) {
		res.status(500).json({
			ok: false,
			error
		});
	}
};
