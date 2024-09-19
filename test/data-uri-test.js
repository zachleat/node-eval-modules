import test from "ava";
import { exec } from "../data-uri.js";

test("const", async t => {
	let results = await exec(`const a = 1;`);
	t.is(Object.keys(results).length, 0);
});

test.skip("module.exports", async t => {
	let results = await exec(`module.exports = { a: 1 };`);
	t.is(Object.keys(results).length, 1);
	t.is(results.a, 1);
});

test.skip("require", async t => {
	let results = await exec(`require("@zachleat/noop")`);
	t.is(Object.keys(results).length, 0);
});

test("export", async t => {
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

test.skip("dynamic import", async t => {
	// let results = await exec(`module.exports = (async () => await import("@zachleat/noop"))()`);
	let results = await exec(`(async () => await import("@zachleat/noop"))()`);
	t.is(Object.keys(results).length, 0);
});