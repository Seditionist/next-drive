import { Property, Entity, ManyToOne, Unique, Index } from "@mikro-orm/core";

import { Base } from "./Base";
import { Folders } from "./Folders";

@Entity()
@Unique({ name: "IX_Folder_File", properties: ["FolderId", "FileName", "FileExtension"] })
export class Files extends Base {

	constructor(file?: Partial<Files>) {
		super();
		Object.assign(this, file);
	}

	@ManyToOne(() => Folders)
	Folder!: Folders;

	@Index({ name: "IX_FolderId" })
	@Property({ nullable: true, type: "number" })
	FolderId?: number | null;

	@Property({ length: 50 })
	FileName: string;

	@Property()
	FileExtension: string;

	@Property()
	FileContentType: string;

	@Property({ hidden: true })
	FileContents: string;
}