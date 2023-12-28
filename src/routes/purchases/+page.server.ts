import { negotiations } from '@/stores/negotiations'
import { error } from '@sveltejs/kit'

export const load = async () => {
	let data = await negotiations

	console.log(data)

	if (!data) throw error(404)

	// return { data }
}
