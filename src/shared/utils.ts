const isEmptyArray = (value: unknown) => {
	if (!(value instanceof Array)) throw new TypeError('value is not an array.')
	if (Array.isArray(value)) return !(value.length > 0)
}
