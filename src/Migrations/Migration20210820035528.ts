import { Migration } from '@mikro-orm/migrations';

export class Migration20210820035528 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "files" drop constraint if exists "files_folder_id_check";');
    this.addSql('alter table "files" alter column "folder_id" type int4 using ("folder_id"::int4);');
    this.addSql('alter table "files" alter column "folder_id" drop not null;');

    this.addSql('alter table "folders" add constraint "IX_Parent_Child" unique ("parent_folder_id", "folder_name");');

    this.addSql('create index "IX_FolderName" on "folders" ("parent_folder_id");');

    this.addSql('alter table "files" add constraint "IX_Folder_File" unique ("folder_id", "file_name", "file_extension");');

    this.addSql('create index "IX_FolderId" on "files" ("folder_id");');
  }

}
