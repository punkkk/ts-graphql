import {Resolver, Query, FieldResolver, Arg, Root, Int, ResolverInterface} from "type-graphql";
import {SampleType} from "./sample-type";
import {createSampleTypeSamples} from "./sample-type-samples";

@Resolver((of) => SampleType)
export class SampleResolver implements ResolverInterface<SampleType> {
  private readonly items: SampleType[] = createSampleTypeSamples();

  @Query((returns) => SampleType, {nullable: true})
  async recipe(@Arg("title") title: string): Promise<SampleType | undefined> {
    return await this.items.find((recipe) => recipe.title === title);
  }

  @FieldResolver()
  ratingsCount(
    @Root() sample: SampleType,
    @Arg("minRate", (type) => Int, {defaultValue: 0.0}) minRate: number,
  ): number {
    return sample.someData.filter((data) => data >= minRate).length;
  }
}
