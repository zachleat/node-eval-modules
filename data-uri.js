async function exec(code) {
	let dataUri = 'data:text/javascript;charset=utf-8,' + encodeURIComponent(code);
	let ret = await import(dataUri);
	return ret;
}

export { exec }