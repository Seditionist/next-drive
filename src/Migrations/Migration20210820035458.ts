import { Migration } from '@mikro-orm/migrations';

export class Migration20210820035458 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "folders" ("id" serial primary key, "uid" varchar(255) not null, "created_at" timestamptz(0) not null, "folder_name" varchar(50) not null, "parent_folder_id" int4 null);');

    this.addSql('create table "files" ("id" serial primary key, "uid" varchar(255) not null, "created_at" timestamptz(0) not null, "folder_id" int4 not null, "file_name" varchar(50) not null, "file_extension" varchar(255) not null, "file_content_type" varchar(255) not null, "file_contents" varchar(255) not null);');

    this.addSql('alter table "folders" add constraint "folders_parent_folder_id_foreign" foreign key ("parent_folder_id") references "folders" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "files" add constraint "files_folder_id_foreign" foreign key ("folder_id") references "folders" ("id") on update cascade;');
  }

}
