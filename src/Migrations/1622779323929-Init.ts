import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1622779323929 implements MigrationInterface {
    name = 'Init1622779323929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Folders" ("Id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "Uid" varchar, "CreatedAt" datetime NOT NULL DEFAULT (datetime('now')), "ParentFolderId" integer, "FolderName" nvarchar(50) NOT NULL, CONSTRAINT "UQ_7820ac5ce85324e6412ce56f244" UNIQUE ("Uid"))`);
        await queryRunner.query(`CREATE INDEX "IX_FolderName" ON "Folders" ("ParentFolderId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IX_Parent_Child" ON "Folders" ("ParentFolderId", "FolderName") `);
        await queryRunner.query(`CREATE TABLE "Files" ("Id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "Uid" varchar, "CreatedAt" datetime NOT NULL DEFAULT (datetime('now')), "FolderId" integer, "FileName" nvarchar(50) NOT NULL, "FileExtension" nvarchar(50) NOT NULL, "FileContentType" nvarchar(50) NOT NULL, "FileContents" text NOT NULL, CONSTRAINT "UQ_44dc9d7e079b63b080dc6df02d7" UNIQUE ("Uid"))`);
        await queryRunner.query(`CREATE INDEX "IX_FolderId" ON "Files" ("FolderId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IX_Folder_File" ON "Files" ("FolderId", "FileName", "FileExtension") `);
        await queryRunner.query(`DROP INDEX "IX_FolderName"`);
        await queryRunner.query(`DROP INDEX "IX_Parent_Child"`);
        await queryRunner.query(`CREATE TABLE "temporary_Folders" ("Id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "Uid" varchar, "CreatedAt" datetime NOT NULL DEFAULT (datetime('now')), "ParentFolderId" integer, "FolderName" nvarchar(50) NOT NULL, CONSTRAINT "UQ_7820ac5ce85324e6412ce56f244" UNIQUE ("Uid"), CONSTRAINT "FK_c792f1a132799b1a8f11b4da200" FOREIGN KEY ("ParentFolderId") REFERENCES "Folders" ("Id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Folders"("Id", "Uid", "CreatedAt", "ParentFolderId", "FolderName") SELECT "Id", "Uid", "CreatedAt", "ParentFolderId", "FolderName" FROM "Folders"`);
        await queryRunner.query(`DROP TABLE "Folders"`);
        await queryRunner.query(`ALTER TABLE "temporary_Folders" RENAME TO "Folders"`);
        await queryRunner.query(`CREATE INDEX "IX_FolderName" ON "Folders" ("ParentFolderId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IX_Parent_Child" ON "Folders" ("ParentFolderId", "FolderName") `);
        await queryRunner.query(`DROP INDEX "IX_FolderId"`);
        await queryRunner.query(`DROP INDEX "IX_Folder_File"`);
        await queryRunner.query(`CREATE TABLE "temporary_Files" ("Id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "Uid" varchar, "CreatedAt" datetime NOT NULL DEFAULT (datetime('now')), "FolderId" integer, "FileName" nvarchar(50) NOT NULL, "FileExtension" nvarchar(50) NOT NULL, "FileContentType" nvarchar(50) NOT NULL, "FileContents" text NOT NULL, CONSTRAINT "UQ_44dc9d7e079b63b080dc6df02d7" UNIQUE ("Uid"), CONSTRAINT "FK_038a74fad73d453f47a07ad64e9" FOREIGN KEY ("FolderId") REFERENCES "Folders" ("Id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Files"("Id", "Uid", "CreatedAt", "FolderId", "FileName", "FileExtension", "FileContentType", "FileContents") SELECT "Id", "Uid", "CreatedAt", "FolderId", "FileName", "FileExtension", "FileContentType", "FileContents" FROM "Files"`);
        await queryRunner.query(`DROP TABLE "Files"`);
        await queryRunner.query(`ALTER TABLE "temporary_Files" RENAME TO "Files"`);
        await queryRunner.query(`CREATE INDEX "IX_FolderId" ON "Files" ("FolderId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IX_Folder_File" ON "Files" ("FolderId", "FileName", "FileExtension") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IX_Folder_File"`);
        await queryRunner.query(`DROP INDEX "IX_FolderId"`);
        await queryRunner.query(`ALTER TABLE "Files" RENAME TO "temporary_Files"`);
        await queryRunner.query(`CREATE TABLE "Files" ("Id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "Uid" varchar, "CreatedAt" datetime NOT NULL DEFAULT (datetime('now')), "FolderId" integer, "FileName" nvarchar(50) NOT NULL, "FileExtension" nvarchar(50) NOT NULL, "FileContentType" nvarchar(50) NOT NULL, "FileContents" text NOT NULL, CONSTRAINT "UQ_44dc9d7e079b63b080dc6df02d7" UNIQUE ("Uid"))`);
        await queryRunner.query(`INSERT INTO "Files"("Id", "Uid", "CreatedAt", "FolderId", "FileName", "FileExtension", "FileContentType", "FileContents") SELECT "Id", "Uid", "CreatedAt", "FolderId", "FileName", "FileExtension", "FileContentType", "FileContents" FROM "temporary_Files"`);
        await queryRunner.query(`DROP TABLE "temporary_Files"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IX_Folder_File" ON "Files" ("FolderId", "FileName", "FileExtension") `);
        await queryRunner.query(`CREATE INDEX "IX_FolderId" ON "Files" ("FolderId") `);
        await queryRunner.query(`DROP INDEX "IX_Parent_Child"`);
        await queryRunner.query(`DROP INDEX "IX_FolderName"`);
        await queryRunner.query(`ALTER TABLE "Folders" RENAME TO "temporary_Folders"`);
        await queryRunner.query(`CREATE TABLE "Folders" ("Id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "Uid" varchar, "CreatedAt" datetime NOT NULL DEFAULT (datetime('now')), "ParentFolderId" integer, "FolderName" nvarchar(50) NOT NULL, CONSTRAINT "UQ_7820ac5ce85324e6412ce56f244" UNIQUE ("Uid"))`);
        await queryRunner.query(`INSERT INTO "Folders"("Id", "Uid", "CreatedAt", "ParentFolderId", "FolderName") SELECT "Id", "Uid", "CreatedAt", "ParentFolderId", "FolderName" FROM "temporary_Folders"`);
        await queryRunner.query(`DROP TABLE "temporary_Folders"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IX_Parent_Child" ON "Folders" ("ParentFolderId", "FolderName") `);
        await queryRunner.query(`CREATE INDEX "IX_FolderName" ON "Folders" ("ParentFolderId") `);
        await queryRunner.query(`DROP INDEX "IX_Folder_File"`);
        await queryRunner.query(`DROP INDEX "IX_FolderId"`);
        await queryRunner.query(`DROP TABLE "Files"`);
        await queryRunner.query(`DROP INDEX "IX_Parent_Child"`);
        await queryRunner.query(`DROP INDEX "IX_FolderName"`);
        await queryRunner.query(`DROP TABLE "Folders"`);
    }

}
