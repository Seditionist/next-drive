declare interface IFile {
	filename: string
	extension: string
	contentType: string
	contents: Buffer
}

declare interface IBodyEntry {
	data: Buffer
	filename: string
	encoding: string
	mimetype: string
	limit: false
}