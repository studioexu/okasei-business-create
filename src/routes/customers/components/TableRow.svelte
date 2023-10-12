<script lang="ts">
	import Icon from '@/components/Icon.svelte'
	export let facilityName: string = ''
	export let address = { prefecture: '', city: '' }
	export let status: string = ''
	export let updateDate: string = ''
	export let id: string = ''

	export let itemId: string = ''
	$: itemId

	const handleDeleteItem = async (e: any) => {
		// itemId = e.target.closest('.btn').id

		itemId = id
	}

	/**
	 * When clicked on the row, the user is redirected to the profile of the customer.
	 * @param e: event to get the right the class of the parent element to be sure it isn't the erase button or update button.
	 */
	const handleRowClick = (e: any) => {
		const classList = e.target.closest('.data').classList.value

		if (classList.includes('update') || classList.includes('erase')) {
			return
		}
		window.location.href = '/customers/' + id
	}

	const iconColor = status === '削除' ? 'rgb(200, 200, 200)' : '#2FA8E1'
</script>

<tr class="row" on:click={handleRowClick}>
	<td class="data customer-number">{id}</td>
	<td class="data facility-name">{facilityName}</td>
	<td class="data address">{address.prefecture}県{address.city}市</td>
	<!-- <td class="data status">{status}日</td> -->
	<td class="data update-date">{status}日 {updateDate}</td>
	<td class="data update">
		<a class="btn btn--update {status === '削除' ? 'disabled' : ''}" href="/customers/{id}/edit">
			<Icon icon={{ path: 'notepad', color: iconColor }} />
		</a>
	</td>
	<td class="data erase">
		<button
			class="btn btn--erase {status === '削除' ? 'disabled' : ''}"
			{id}
			on:click={handleDeleteItem}
		>
			<Icon icon={{ path: 'trash-bin', color: iconColor }} />
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

	.disabled {
		pointer-events: none;
	}
</style>
