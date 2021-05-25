export const FileSchema = {
	type: "object",
	properties: {
		FolderID: { type: "number" },
		FileName: { type: "string" },
		FileExtension: { type: "string" },
		FileContentType: { type: "string" },
		FileContents: { type: "string" }
	}
};

export const FolderSchema = {
	type: "object",
	properties: {
		ParentFolderID: { type: "number" },
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
					ParentFolderID: { type: "number" },
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