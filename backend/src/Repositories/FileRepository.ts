import path from "path";
import sanitize from "sanitize-filename";

import { Files } from "../Models/Files";
import { Generic } from "../Utilities/Generic";
import { Database } from "../Services/Database";
import { Folder } from "./FolderRepository";
import { IFile } from "../Types/Abstracts";

export class File {

	private static Repo = Database.Repo.fork().getRepository(Files);

	private static async IsUnique(file: Files, folder?: number | null): Promise<boolean> {
		const exists = await File.Repo.findOne({
			$and: [
				{ FileName: file.FileName },
				{ FileExtension: file.FileExtension },
				{ FolderId: (folder ?? null) },
				{ "Id !=": file.Id ?? 0 }
			]
		});
		return exists ? true : false;
	}

	public static async GetRootFiles(): Promise<Files[]> {
		try {
			const files = await File.Repo.find({ FolderId: null }, { orderBy: { FileName: "ASC", FileExtension: "ASC" } });
			return files;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async GetFolderFiles(Uid: string): Promise<Files[]> {
		try {
			const folder = await Folder.GetFolder(Uid);
			if (!folder) throw "folder not found";

			return await File.Repo.find({
				FolderId: folder.Id
			}, { orderBy: { FileName: "ASC", FileExtension: "ASC" } });
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async GetFile(Uid: string): Promise<Files> {
		try {
			const file = await File.Repo.findOne({ Uid });
			if (!file) throw "file not found";

			return file;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async InsertRoot(file: IFile): Promise<boolean> {
		try {
			const sanitized = sanitize(file.filename);
			if (file.filename != sanitized) throw "invalId filename";

			const newFile = new Files({
				FileName: file.filename,
				FileExtension: file.extension,
				FileContentType: file.contentType,
				FileContents: Generic.BufferToBase64(file.contents)
			});

			const exists = await File.IsUnique(newFile);
			if (exists) throw "file already exists";

			await File.Repo.persistAndFlush(newFile);
			return true;
		} catch (error) {
			Database.Repo.clear();
			throw new Error(error);
		}
	}

	public static async InsertSub(folderUid: string, file: IFile): Promise<boolean> {
		try {
			const sanitized = sanitize(file.filename);
			if (file.filename != sanitized) throw "invalId filename";

			const folder = await Folder.GetFolder(folderUid);
			if (!folder) throw "folder not found";

			const newFile = new Files({
				FolderId: folder.Id,
				FileName: file.filename,
				FileExtension: file.extension,
				FileContentType: file.contentType,
				FileContents: Generic.BufferToBase64(file.contents)
			});

			const exists = await File.IsUnique(newFile, folder.Id);
			if (exists) throw "file already exists";

			await File.Repo.persistAndFlush(newFile);
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async Rename(uid: string, name: string): Promise<boolean> {
		try {
			const sanitized = sanitize(name);
			if (name != sanitized) throw "invalid filename";

			const file = await File.Repo.findOne({ Uid: uid });
			if (!file) throw "file not found";

			const ext = path.extname(name);
			file.FileName = path.basename(name, ext);

			const exists = await File.IsUnique(file, file.FolderId);
			if (exists) throw "file already exists";

			await File.Repo.persistAndFlush(file);
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async Move(Uid: string, folderUId: string): Promise<boolean> {
		try {
			const file = await File.Repo.findOne({ Uid });
			if (!file) throw "file not found";

			const folder = await Folder.GetFolder(folderUId);
			if (!folder) throw "folder not found";

			file.FolderId = folder.Id;

			const exists = await File.IsUnique(file, file.FolderId);
			if (exists) throw "file already exists";

			await File.Repo.persistAndFlush(file);
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async Delete(Uid: string): Promise<boolean> {
		try {
			const file = await File.Repo.findOne({ Uid });

			if (!file) throw "file not found";

			await File.Repo.removeAndFlush(file);
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}
}