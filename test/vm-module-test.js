import test from "ava";
import vm from "node:vm";
import { exec } from "../vm-module.js";

// requires --experimental-vm-modules
let testFn = "SourceTextModule" in vm ? test : test.skip;

testFn("const", async t => {
	let results = await exec(`const a = 1;`);
	t.is(Object.keys(results).length, 0);
	t.is(globalThis.a, undefined);
});

test.skip("module.exports", async t => {
	let results = await exec(`module.exports = { a: 1 };`);
	t.is(Object.keys(results).length, 1);
	t.is(results.a, 1);
});

testFn("require", async t => {
	let results = await exec(`require("@zachleat/noop")`);
	t.is(Object.keys(results).length, 0);
});

testFn("export", async t => {
	let results = await exec(`const a = 1; export { a };`);
	t.is(Object.keys(results).length, 1);
	t.is(results.a, 1);
});

testFn("import", async t => {
	let results = await exec(`import "@zachleat/noop"`);
	t.is(Object.keys(results).length, 0);
});

testFn("top level async/await", async t => {
	let results = await exec(`await new Promise(resolve => resolve())`);
	t.is(Object.keys(results).length, 0);
});

testFn("dynamic import", async t => {
	// let results = await exec(`module.exports = (async () => await import("@zachleat/noop"))()`);
	let results = await exec(`(async () => await import("@zachleat/noop"))()`);
	t.is(Object.keys(results).length, 0);
});

testFn("doesn’t leak", async t => {
	let results = await exec(`globalThis.b = 2;`);
	t.is(globalThis.b, undefined);
});