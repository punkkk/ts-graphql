import {Field, ID, ObjectType} from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import {Author} from "./author";
import {Lazy} from "../types";

@ObjectType()
@Entity()
export class Book {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  name: string;

  @ManyToMany((type) => Author, (author) => author.books, {lazy: true})
  @JoinTable()
  @Field((type) => [Author])
  authors: Lazy<Author[]>;
}
