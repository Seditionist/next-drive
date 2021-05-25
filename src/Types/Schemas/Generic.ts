export const FileSchema = {
	type: "object",
	properties: {
		uid: { type: "string" },
		FolderUid: { type: "string" },
		FileName: { type: "string" },
		FileExtension: { type: "string" },
		FileContentType: { type: "string" },
		FileContents: { type: "string" }
	}
};

export const FolderSchema = {
	type: "object",
	properties: {
		uid: { type: "string" },
		FolderName: { type: "string" },
		files: {
			type: "array",
			items: FileSchema
		},
		subFolders: {
			type: "array",
			items: {
				type: "object",
				properties: {
					uid: { type: "string" },
					FolderName: { type: "string" },
					files: {
						type: "array",
						items: FileSchema
					}
				}
			}
		}
	}
};