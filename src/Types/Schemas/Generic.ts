export const FileSchema = {
	type: "object",
	properties: {
		Uid: { type: "string" },
		FolderUid: { type: "string" },
		FileName: { type: "string" },
		FileExtension: { type: "string" },
		FileContentType: { type: "string" },
		FileContents: { type: "string" },
		CreatedAt: { type: "string" }
	}
};

export const FolderSchema = {
	type: "object",
	properties: {
		Uid: { type: "string" },
		FolderName: { type: "string" },
		CreatedAt: { type: "string" }
	}
};

export const SuccessSchema = {
	200: {
		type: "object",
		properties: {
			ok: { type: "boolean" },
			status: { type: "number" },
			data: { type: "boolean" }
		}
	}
};