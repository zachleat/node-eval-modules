async function exec(code) {
	// Not currently supported in Node.js
	// https://github.com/dbushell/dinossr/blob/main/src/bundle/import.ts#L13
  let blob = new Blob([code], {type: 'text/javascript'});
  let url = URL.createObjectURL(blob);
  let ret = await import(url);
  URL.revokeObjectURL(url);
	return ret;
}

export { exec }