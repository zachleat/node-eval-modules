import vm from "node:vm";
import { createRequire } from "node:module";

const customRequire = createRequire(import.meta.url);

async function exec(code) {
	let context = {
		require: customRequire,
		module: {},
	};
	vm.createContext(context, {});

	// CommonJS only
	let ret = await vm.runInContext(`(async () => { ${code} })();\nmodule.exports;`, context, {
		// requires --experimental-vm-modules
		// importModuleDynamically: (specifier) => import(specifier),

		// experimental added in: v21.7.0, v20.12.0
		importModuleDynamically: vm.constants.USE_MAIN_CONTEXT_DEFAULT_LOADER,
	});
	if(ret) {
		return ret;
	}
	return {};
}

export { exec }