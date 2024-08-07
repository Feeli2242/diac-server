export const toCapitalize = (value: string) => {
	return value
		.split(' ')
		.map((n) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase())
		.join(' ')
		.trim()
}
