import { Column, Entity, Index, ManyToOne, JoinColumn } from "typeorm";

import { Base } from "./Base";
import { Folder } from "./Folder";

@Entity("Files")
@Index("IX_Folder_File", ["FolderId", "FileName", "FileExtension"], { unique: true })
export class File extends Base {

	@Index("IX_FolderId")
	@Column({ type: "int", nullable: true })
	FolderId: number | null

	@Column({ type: "nvarchar", nullable: false, length: "50" })
	FileName: string

	@Column({ type: "nvarchar", nullable: false, length: "50" })
	FileExtension: string

	@Column({ type: "nvarchar", nullable: false, length: "50" })
	FileContentType: string

	@Column({ type: "text", nullable: false })
	FileContents: string

	@ManyToOne(() => Folder, folder => folder.Files, { onDelete: "CASCADE" })
	@JoinColumn({ name: "FolderId" })
	Folder: Folder
}