export const debounce = <F extends (...args: any[]) => void>(func: F, time: number) => {
	let timer: ReturnType<typeof setTimeout>

	return (...args: Parameters<F>) => {
		clearTimeout(timer)

		timer = setTimeout(() => {
			func(...args)
		}, time)
	}
}
