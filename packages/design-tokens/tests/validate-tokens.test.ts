import { test } from "node:test";
import { equal } from "node:assert";
import Ajv from "ajv";

import schema from "./tokens-schema.json";

import * as tokens from "../dist";

const ajv = new Ajv();
const validate = ajv.compile(schema);

test("light tokens should be valid structure", () => {
  equal(validate(tokens.light), true);
});

test("light tokens should be valid structure", () => {
  equal(validate(tokens.dark), true);
});
