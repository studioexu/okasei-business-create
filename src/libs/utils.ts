import type { Department } from './customerTypes'

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

/**
 * From a "departments" array, we will get the sum of the number of beds.
 * "Departments" arrayから各分科のベッド数をを加えて、ベッド数の合計を計算するファンクション。
 * @param departments: array of departments. 分科のArrayである。
 * @returns number total of beds。ベッド数の合計。
 */
export const getTotalOfBeds = (departments: Department[]): number => {
	let sum: number = 0
	departments.map((department: Department) => {
		const numberOfBed = isNaN(department.numberOfBeds) ? 0 : department.numberOfBeds
		sum += numberOfBed
	})

	return sum
}
