import { Field, InputType, Int } from "type-graphql";

@InputType()
export class AuthorInput {
  @Field()
  name!: string;

  @Field(() => [Int], { nullable: true })
  books!: number[];
}
