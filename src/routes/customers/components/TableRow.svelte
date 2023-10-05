<script lang="ts">
	import Icon from '@/components/Icon.svelte'
	import { loadData, deleteItem } from '../utils/actions'
	export let facilityName: string = ''
	export let address = { prefecture: '', city: '' }
	export let status: string = ''
	export let updateDate: string = ''
	export let id: string = ''

	export let data: any[] = []
	export let newData: any[] = []
	$: data

	const handleDeleteItem = async (e: any) => {
		const customerId = e.target.closest('.btn').id
		deleteItem(customerId, 'http://localhost:3000/customers/').then(
			(data = await loadData('http://localhost:3000/customers/'))
		)
	}

	//We update newData, so that it displays the right information
	$: newData = data

	const handleRowClick = (e: any) => {
		console.log(e.target.closest('.data').classList.value)
		const classList = e.target.closest('.data').classList.value

		if (classList.includes('update') || classList.includes('erase')) {
			return
		}
		window.location.href = '/customers/' + id
	}
</script>

<tr class="row" on:click={handleRowClick}>
	<td class="data customer-number">{id}</td>
	<td class="data facility-name">{facilityName}</td>
	<td class="data address">{address.prefecture}県{address.city}市</td>
	<td class="data status">{status}</td>
	<td class="data update-date">{updateDate}</td>
	<td class="data update">
		<a class="btn btn--update" href="/customers/{id}">
			<Icon icon={{ path: 'notepad', color: '#2FA8E1' }} />
		</a>
	</td>
	<td class="data erase">
		<button class="btn btn--erase" {id} on:click={handleDeleteItem}>
			<Icon icon={{ path: 'trash-bin', color: '#2FA8E1' }} />
		</button>
	</td>
</tr>

<style lang="scss">
	.row {
		position: relative;
		cursor: pointer;

		&:hover {
			background-color: hsl(199, 75%, 53%, 0.1);
		}
	}

	.data {
		text-align: left;
		padding: 18px calc((27 / 1366) * 100vw);
		border-bottom: #2fa8e1 1px solid;
	}

	.row:last-child .data {
		border: none;
	}

	.btn {
		background-color: transparent;
		transition: transform 300ms;
		z-index: 99;

		&:hover {
			cursor: pointer;
			transform: scale(1.2);
		}
	}
</style>
