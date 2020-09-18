import {Resolver, Query, Arg} from "type-graphql";
import {SampleType} from "./sample-type";
import {Service} from "typedi";
import {SampleService} from "./sample-service";

@Service()
@Resolver((of) => SampleType)
export class SampleResolver {
  constructor(
    // constructor injection of a service
    private readonly recipeService: SampleService,
  ) {}

  @Query((returns) => SampleType, {nullable: true})
  async recipe(@Arg("recipeId") recipeId: string) {
    // usage of the injected service
    return this.recipeService.getOne(recipeId);
  }
}
