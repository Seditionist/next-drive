import { Property, OneToMany, ManyToOne, Entity, Collection, Unique, Index } from "@mikro-orm/core";

import { Base } from "./Base";
import { Files } from "./Files";

@Entity()
@Unique({ name: "IX_Parent_Child", properties: ["ParentFolderId", "FolderName"] })
export class Folders extends Base {

	constructor(folder?: Partial<Folders>) {
		super();
		Object.assign(this, folder);
	}

	@Index({ name: "IX_FolderName" })
	@Property({ nullable: true, type: "number" })
	ParentFolderId?: number | null;

	@Property({ length: 50 })
	FolderName: string;

	@ManyToOne(() => Folders, { nullable: true, onDelete: "CASCADE" })
	ParentFolder?: Folders | null;

	@OneToMany(() => Folders, folder => folder.ParentFolder, { eager: true, orphanRemoval: true })
	SubFolders = new Collection<Folders>(this);

	@OneToMany(() => Files, file => file.Folder, { eager: true, orphanRemoval: true })
	Files = new Collection<Files>(this);
}