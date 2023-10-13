import { Input, Output } from "@/lib/input";
import { truthTable } from "../lib/truthTable";

const A = new Input("A");
const B = new Input("B");
const F = new Output("F");

const truthTable = truthTable(A + B);
