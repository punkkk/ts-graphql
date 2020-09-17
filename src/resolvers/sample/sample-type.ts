import {Field, ObjectType, Int, Float, GraphQLISODateTime} from "type-graphql";

@ObjectType({description: "Object representing cooking recipe"})
export class SampleType {
  @Field((type) => String)
  title!: string;

  @Field((type) => String, {nullable: true, deprecationReason: "Use `description` field instead"})
  get specification(): string | undefined {
    return this.description;
  }

  @Field((type) => String, {nullable: true, description: "The recipe description with preparation info"})
  description?: string;

  @Field((type) => [Int])
  someData!: number[];

  @Field(() => GraphQLISODateTime)
  creationDate!: Date;

  @Field((type) => Int)
  ratingsCount!: number;

  @Field((type) => Float, {nullable: true})
  get averageData(): number | null {
    const ratingsCount = this.someData.length;
    if (ratingsCount === 0) {
      return null;
    }
    const ratingsSum = this.someData.reduce((a, b) => a + b, 0);
    return ratingsSum / ratingsCount;
  }
}
