import path from "path";
import sanitize from "sanitize-filename";

import { Folders } from "../Models/Folders";
import { Files } from "../Models/Files";
import { Generic } from "../Utilities/Generic";
import { Database } from "../Services/Database";
export class File {

	private static async IsUnique(file: Files, folder?: number | null): Promise<boolean> {
		const exists = await Database.Repo.findOne(Files, {
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
			const files = await Database.Repo.find(Files, {
				FolderId: null
			});
			return files;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async GetFolderFiles(Uid: string): Promise<Files[]> {
		try {
			const folder = await Database.Repo.findOne(Folders, { Uid });
			if (!folder) throw "folder not found";

			return await Database.Repo.find(Files, {
				FolderId: folder.Id
			});
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async GetFile(Uid: string): Promise<Files> {
		try {
			const file = await Database.Repo.findOne(Files, { Uid });
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

			await Database.Repo.persistAndFlush(newFile);
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

			const folder = await Database.Repo.findOne(Folders, { Uid: folderUid });
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

			await Database.Repo.persistAndFlush(newFile);
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async Rename(uid: string, name: string): Promise<boolean> {
		try {
			const sanitized = sanitize(name);
			if (name != sanitized) throw "invalid filename";

			const file = await Database.Repo.findOne(Files, { Uid: uid });
			if (!file) throw "file not found";

			const ext = path.extname(name);
			file.FileName = path.basename(name, ext);

			const exists = await File.IsUnique(file, file.FolderId);
			if (exists) throw "file already exists";

			await Database.Repo.persistAndFlush(file);
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async Move(Uid: string, folderUId: string): Promise<boolean> {
		try {
			const file = await Database.Repo.findOne(Files, { Uid });
			if (!file) throw "file not found";

			const folder = await Database.Repo.findOne(Folders, { Uid: folderUId });
			if (!folder) throw "folder not found";

			file.FolderId = folder.Id;

			const exists = await File.IsUnique(file, file.FolderId);
			if (exists) throw "file already exists";

			await Database.Repo.persistAndFlush(file);
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async Delete(Uid: string): Promise<boolean> {
		try {
			const file = await Database.Repo.findOne(Files, { Uid });

			if (!file) throw "file not found";

			await Database.Repo.removeAndFlush(file);
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}
}