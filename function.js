async function exec(code) {
	let fn = Function(`return async () => { ${code} }`);
	return fn();
}

export { exec }