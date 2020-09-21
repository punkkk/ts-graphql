import {Field, InputType, Int} from "type-graphql";

@InputType()
export class BookInput {
  @Field()
  title!: string;

  @Field(() => [Int], {nullable: true})
  authors!: number[];
}
