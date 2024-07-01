import { test } from "node:test";
import { equal } from "node:assert";
import Ajv from "ajv";

import tokens from "../dist/tokens.json";
import schema from "./tokens-schema.json";

test("tokens should be valid structure", () => {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  equal(validate(tokens), true);
});
