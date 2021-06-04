import { Not } from "typeorm";

import { Folder as _Folder } from "../Models/Folder";

export class Folder {

	private static async IsUnique(folder: _Folder): Promise<boolean> {
		const exists = await _Folder.findOne({
			ParentFolderId: folder.ParentFolderId ?? null,
			FolderName: folder.FolderName,
			Id: Not(folder.Id ?? 0)
		});
		return exists ? true : false;
	}

	public static async GetRootFolders(): Promise<_Folder[]> {
		try {
			return await _Folder.find({ ParentFolderId: null });
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async GetSubFolders(Uid: string): Promise<_Folder[]> {
		try {
			const parent = await _Folder.findOne({ Uid });

			if (!parent) throw "Folder not found.";

			return await _Folder.find({ ParentFolderId: parent.Id });
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async MoveFolder(Uid: string, parentUid?: string): Promise<boolean> {
		try {
			const target = await _Folder.findOne({ Uid });
			if (!target) throw "target folder not found";

			if (parentUid) {
				const parent = await _Folder.findOne({ Uid: parentUid });
				if (!parent) throw "parent folder not found";

				console.log(parent);
				target.ParentFolderId = parent.Id;
				console.log(target);
			}
			else
				target.ParentFolderId = null;

			const exists = await Folder.IsUnique(target);
			if (exists) throw "folder already exists";

			await target.save();
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async InsertRoot(name: string): Promise<boolean> {
		try {
			const newFolder = new _Folder();

			newFolder.FolderName = name;

			const exists = await Folder.IsUnique(newFolder);
			if (exists) throw "folder already exists";

			await newFolder.save();
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async InsertSub(parentUid: string, name: string): Promise<boolean> {
		try {
			const parent = await _Folder.findOne({ Uid: parentUid });
			if (!parent) throw "parent folder does not exist";

			const newFolder = new _Folder();

			newFolder.ParentFolderId = parent.Id;
			newFolder.FolderName = name;

			const exists = await Folder.IsUnique(newFolder);
			if (exists) throw "folder already exists";

			await newFolder.save();
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async Rename(Uid: string, name: string): Promise<boolean> {
		try {
			const folder = await _Folder.findOne({ Uid });
			if (!folder) throw "folder not found";

			folder.FolderName = name;

			const exists = await Folder.IsUnique(folder);
			if (exists) throw "folder already exists";

			await folder.save();
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async Delete(Uid: string): Promise<boolean> {
		try {
			const folder = await _Folder.findOne({ Uid });
			if (!folder) throw "folder not found";

			await folder.remove();
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}
}