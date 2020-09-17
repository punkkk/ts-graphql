import {InputType, Field} from "type-graphql";
import {SampleType} from "./sample-type";

@InputType()
export class SampleInputType implements Partial<SampleType> {
  @Field()
  title!: string;

  @Field({nullable: true})
  description?: string;
}
