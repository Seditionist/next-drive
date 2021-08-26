import { FastifyRequest } from "fastify";

export interface IFile {
	filename: string,
	extension: string,
	contentType: string,
	contents: Buffer
}

export interface IParentTree {
    Name: string | undefined,
    Uid: string | undefined
}

export interface IBodyEntry {
	data: Buffer,
	filename: string,
	encoding: string,
	mimetype: string,
	limit: false
}

interface IParams {
    uid: string,
	folder: string
}

interface IBody {
    uid: string,
	name: string,
    files: IBodyEntry[],
    folderUID: string,
    parent: string
}

export interface IRequestContext extends FastifyRequest {
	Params: IParams,
	Body: IBody
}