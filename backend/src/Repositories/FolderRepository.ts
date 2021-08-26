import { IParentTree } from "src/Types/Abstracts";
import { Folders } from "../Models/Folders";
import { Database } from "../Services/Database";

export class Folder {

	private static Repo = Database.Repo.fork().getRepository(Folders);

	private static async IsUnique(folder: Folders): Promise<boolean> {
		try {
			const exists = await Folder.Repo.findOne({
				$and: [
					{ ParentFolderId: folder.ParentFolderId ?? null },
					{ FolderName: folder.FolderName },
					{ "Id !=": folder.Id ?? 0 }
				]
			});
			return exists ? true : false;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async GetFolder(Uid: string): Promise<Folders> {
		try {
			return await Folder.Repo.findOne({ Uid }) as Folders;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async GetRootFolders(): Promise<Folders[]> {
		try {
			return await Folder.Repo.find({ ParentFolderId: null }, { orderBy: { FolderName: "ASC" } });
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async GetSubFolders(Uid: string): Promise<Folders[]> {
		try {
			const parent = await Folder.Repo.findOne({ Uid });
			
			if (!parent) throw "Folder not found.";

			return await Folder.Repo.find( { ParentFolderId: parent.Id }, { orderBy: { FolderName: "ASC" } });
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async GetParentTree(Uid: string): Promise<IParentTree[]> {
		try {
			const parent = await Folder.Repo.findOne({ Uid });
			
			if (!parent) throw "Folder not found.";

			await Folder.Repo.find( { });

			const nodes: IParentTree[] = [];
			
			nodes.push({
				Name: parent.FolderName,
				Uid: parent.Uid
			});

			let tree: Folders | null | undefined = parent;
			while(tree?.ParentFolderId){
				nodes.push({ 
					Name: tree.ParentFolder?.FolderName, 
					Uid: tree.ParentFolder?.Uid
				});
				tree = tree.ParentFolder;
			}
			Database.Repo.clear();
			return nodes;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async MoveFolder(Uid: string, parentUid?: string): Promise<boolean> {
		try {
			const target = await Folder.Repo.findOne({ Uid });
			if (!target) throw "target folder not found";

			if (parentUid) {
				const parent = await Folder.Repo.findOne({ Uid: parentUid });
				if (!parent) throw "parent folder not found";

				console.log(parent);
				target.ParentFolderId = parent.Id;
				console.log(target);
			}
			else
				target.ParentFolderId = null;

			const exists = await Folder.IsUnique(target);
			if (exists) throw "folder already exists";

			await Folder.Repo.persistAndFlush(target);
			return true;
		} catch (error) {
			Database.Repo.clear();
			throw new Error(error);
		}
	}

	public static async InsertRoot(name: string): Promise<boolean> {
		try {
			const newFolder = new Folders();

			newFolder.FolderName = name;

			const exists = await Folder.IsUnique(newFolder);
			if (exists) throw "folder already exists";

			await Folder.Repo.persistAndFlush(newFolder);
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async InsertSub(parentUid: string, name: string): Promise<boolean> {
		try {
			const parent = await Folder.Repo.findOne({ Uid: parentUid });
			if (!parent) throw "parent folder does not exist";

			const newFolder = new Folders();

			newFolder.ParentFolderId = parent.Id;
			newFolder.FolderName = name;

			const exists = await Folder.IsUnique(newFolder);
			if (exists) throw "folder already exists";

			await Folder.Repo.persistAndFlush(newFolder);
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async Rename(Uid: string, name: string): Promise<boolean> {
		try {
			const folder = await Folder.Repo.findOne({ Uid });
			if (!folder) throw "folder not found";

			folder.FolderName = name;

			const exists = await Folder.IsUnique(folder);
			if (exists) throw "folder already exists";

			await Folder.Repo.persistAndFlush(folder);
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}

	public static async Delete(Uid: string): Promise<boolean> {
		try {
			const folder = await Folder.Repo.findOne({ Uid });
			if (!folder) throw "folder not found";

			await Folder.Repo.removeAndFlush(folder);
			return true;
		} catch (error) {
			throw new Error(error);
		}
	}
}