import { PrimaryKey, Property } from "@mikro-orm/core";

import { Generic } from "@/Utilities/Generic";

export abstract class Base {

	@PrimaryKey({ hidden: true })
	Id!: number;

	@Property({ onCreate: () => Generic.CreateUUID() })
	Uid: string

	@Property()
	CreatedAt: Date = new Date();
}