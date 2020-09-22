import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Lazy } from "../types";
import { Book } from "./book";

@ObjectType()
@Entity()
export class Author {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  name!: string;

  @ManyToMany((type) => Book, (book) => book.authors, { lazy: true })
  @Field((type) => [Book])
  books!: Lazy<Book[]>;
}
