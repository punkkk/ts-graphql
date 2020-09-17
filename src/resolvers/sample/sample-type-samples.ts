import {plainToClass} from "class-transformer";
import {SampleType} from "./sample-type";

export const createSampleTypeSamples = () => {
  return plainToClass(SampleType, [
    {
      description: "Desc 1",
      title: "SampleType 1",
      someData: [0, 3, 1],
      creationDate: new Date("2018-04-11"),
    },
    {
      description: "Desc 2",
      title: "SampleType 2",
      someData: [4, 2, 3, 1],
      creationDate: new Date("2018-04-15"),
    },
    {
      description: "Desc 3",
      title: "SampleType 3",
      someData: [5, 4],
      creationDate: new Date(),
    },
  ]);
};
