import { Migration } from '@mikro-orm/migrations';

export class Migration20210822025925 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "folders" add constraint "IX_Parent_Child" unique ("parent_folder_id", "folder_name");');

    this.addSql('create index "IX_FolderName" on "folders" ("parent_folder_id");');

    this.addSql('alter table "files" add constraint "IX_Folder_File" unique ("folder_id", "file_name", "file_extension");');

    this.addSql('create index "IX_FolderId" on "files" ("folder_id");');
  }

}
