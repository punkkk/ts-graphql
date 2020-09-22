import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Lazy } from "../types";
import { Author } from "./author";

@ObjectType()
@Entity()
export class Book {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  title!: string;

  @ManyToMany((type) => Author, (author) => author.books, { lazy: true })
  @JoinTable()
  @Field((type) => [Author])
  authors!: Lazy<Author[]>;
}
