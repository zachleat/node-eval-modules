import { pathToFileURL } from "node:url";
import { Module } from "node:module";

async function exec(code) {
	let m = new Module();
	let workingDir = pathToFileURL(import.meta.url).toString();
	m.paths = Module._nodeModulePaths(workingDir);
	m._compile(`(async () => { ${code} })();`, workingDir);
	return m.exports;
}

export { exec }