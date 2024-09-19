import vm from "node:vm";
import { createRequire } from "node:module";

const customRequire = createRequire(import.meta.url);

async function exec(code) {
	let context = {
		require: customRequire
	};
	vm.createContext(context, {});

	// if(!vm.SourceTextModule) {
	// 	throw new Error("--experimental-vm-modules is currently required to use vm.Module");
	// }

	// requires --experimental-vm-modules
	let m = new vm.SourceTextModule(code, {
		context,
		importModuleDynamically: (specifier) => import(specifier),
		// initializeImportMeta: (meta, module) => {
		// 	meta.url = module.identifier;
		// },

	});

	// Thank you! https://stackoverflow.com/a/73282303/16711
	await m.link(async (specifier, referencingModule) => {
		const mod = await import(specifier);
		const exportNames = Object.keys(mod);

		return new vm.SyntheticModule(
			exportNames,
			function () {
				exportNames.forEach(key => {
					this.setExport(key, mod[key])
				});
			},
			{
				identifier: specifier,
				context: referencingModule.context
			}
		);
	});

	await m.evaluate();

	if(Object.keys(m.namespace).length) {
		return m.namespace;
	}
	return {};
}

export { exec }