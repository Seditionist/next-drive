import { BaseEntity, BeforeInsert, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { classToPlain, Exclude } from "class-transformer";

import { Generic } from "../Utilities/Generic";

export abstract class Base extends BaseEntity {

	@Exclude()
	@PrimaryGeneratedColumn()
	Id: number;

	@Column({ unique: true, nullable: true })
	Uid: string

	@CreateDateColumn()
	CreatedAt: Date

	@BeforeInsert()
	seed(): void {
		this.Uid = Generic.CreateUUID();
	}

	toJSON(): Record<string, unknown> {
		return classToPlain(this);
	}
}