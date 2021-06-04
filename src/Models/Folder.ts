import { Column, OneToMany, ManyToOne, Index, Entity, JoinColumn } from "typeorm";
// import { Column, Entity, Index } from "typeorm";

import { Base } from "./Base";
import { File } from "./File";

@Entity("Folders")
@Index("IX_Parent_Child", ["ParentFolderId", "FolderName"], { unique: true })
export class Folder extends Base {

	@Index("IX_FolderName")
	@Column({ type: "int", nullable: true })
	ParentFolderId: number | null

	@Column({ type: "nvarchar", nullable: false, length: "50" })
	FolderName: string

	@ManyToOne(() => Folder, folder => folder.SubFolders, { onDelete: "CASCADE" })
	@JoinColumn({ name: "ParentFolderId" })
	ParentFolder: Folder

	@OneToMany(() => Folder, folder => folder.ParentFolder)
	SubFolders: Folder[]

	@OneToMany(() => File, file => file.Folder, { onDelete: "CASCADE" })
	Files: File[]
}