import fs from "node:fs/promises";
import path from "node:path";
import { printSchema, buildSchema } from "graphql";
import { printSchemaWithDirectives } from "@graphql-tools/utils";

import { typeDefs } from "../src/typeDefs.js";

const schema = buildSchema(typeDefs);
const schemaPath = path.resolve(path.dirname(import.meta.url.replace("file://", "")), "../schema.graphql");
await fs.writeFile(
  schemaPath,
  "# This is auto generated file. Don't edit.\n" + printSchemaWithDirectives(schema),
  "utf8",
);
