import {Field, ID, ObjectType} from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import {Book} from "./book";
import {Lazy} from "../types";

@ObjectType()
@Entity()
export class Author {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  name: string;

  @ManyToMany((type) => Book, (book) => book.authors, {lazy: true})
  @Field((type) => [Book])
  books: Lazy<Book[]>;
}
