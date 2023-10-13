import { Input } from "../lib/init.js";
import { truthTable } from "../packages/truth-table/index.js";

const A = new Input("A");
const B = new Input("B");
const result = truthTable(A + B);
