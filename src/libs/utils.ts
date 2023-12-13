export const debounce = <F extends (...args: any[]) => void>(
	func: F,
	time: number
): ((...args: Parameters<F>) => void) => {
	let timer: ReturnType<typeof setTimeout>

	return (...args: Parameters<F>) => {
		clearTimeout(timer)

		timer = setTimeout(() => {
			func(...args)
		}, time)
	}
}

export const toKebab = (str: string): string =>
	str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

export const toNumber = (str: string): number => parseInt(str, 10)
