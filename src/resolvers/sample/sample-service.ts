import {Service, Inject} from "typedi";
import {SampleType} from "./sample-type";

@Service()
export class SampleService {
  @Inject("SAMPLES")
  private readonly items!: SampleType[];

  async getOne(title: string) {
    return this.items.find((item) => item.title === title);
  }
}
