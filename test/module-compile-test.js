import test from "ava";
import { exec } from "../module-compile.js";

test("const", async t => {
	let results = await exec(`const a = 1;`);
	t.is(Object.keys(results).length, 0);
	t.is(globalThis.a, undefined);
});

test("module.exports", async t => {
	let results = await exec(`module.exports = { a: 1 };`);
	t.is(Object.keys(results).length, 1);
	t.is(results.a, 1);
});

test("require", async t => {
	let results = await exec(`require("@zachleat/noop")`);
	t.is(Object.keys(results).length, 0);
});

test.skip("export", async t => {
	let results = await exec(`const a = 1; export { a };`);
	t.is(Object.keys(results).length, 1);
	t.is(results.a, 1);
});

test.skip("import", async t => {
	let results = await exec(`import "@zachleat/noop"`);
	t.is(Object.keys(results).length, 0);
});

test("top level async/await", async t => {
	let results = await exec(`await new Promise(resolve => resolve())`);
	t.is(Object.keys(results).length, 0);
});

test("dynamic import", async t => {
	// let results = await exec(`module.exports = (async () => await import("@zachleat/noop"))()`);
	let results = await exec(`(async () => await import("@zachleat/noop"))()`);
	t.is(Object.keys(results).length, 0);
});

test.skip("doesn’t leak", async t => {
	let results = await exec(`globalThis.b = 3;`);
	t.is(globalThis.b, undefined);
});