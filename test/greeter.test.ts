import * as casual from "casual";

import {Greeter} from "../src/resolvers/sample/sample-resolver";

describe("Greeter", () => {
  it("should greet anything", () => {
    const toGreet = casual.name;
    const greeter = new Greeter(toGreet);

    expect(greeter.greeting()).toBe(`Hello ${toGreet}!`);
  });
});
