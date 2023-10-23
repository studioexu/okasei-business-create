<script lang="ts">
	import Icon from '@/components/Icon.svelte'

	export let customerName: string = ''
	export let address = { prefecture: '', city: '' }
	export let isActive: boolean
	export let updateDate: string = ''
	export let id: string = ''
	export let status: string
	export let itemId: string = ''

	$: itemId

	const handleDeleteItem = async (e: any) => {
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
</script>

<!-- <div> -->
<!-- <tr
	class="row {isActive ? '' : 'deleted'}"
	on:click={handleRowClick}
	in:receive={{ key: id }}
	out:send={{ key: id }}
> -->
<!-- <div out:fly={{ x: 200 }}> -->
<td class="data customer-number">{id}</td>
<td class="data facility-name">{customerName}</td>
<td class="data address">{address.prefecture}{address.city}</td>
<!-- <td class="data status">{status}日</td> -->
<td class="data update-date">{status}日 {updateDate}</td>
<td class="data update">
	<a class="btn btn--update {isActive ? '' : 'disabled'}" href="/customers/{id}/edit">
		{#if isActive}
			<Icon icon={{ path: 'notepad', color: '#2FA8E1' }} />
		{:else}
			<Icon icon={{ path: 'notepad', color: 'rgb(200, 200, 200)' }} />
		{/if}
	</a>
</td>
<td class="data erase">
	<button class="btn btn--erase {isActive ? '' : 'disabled'}" {id} on:click={handleDeleteItem}>
		{#if isActive}
			<Icon icon={{ path: 'trash-bin', color: '#2FA8E1' }} />
		{:else}
			<Icon icon={{ path: 'trash-bin', color: 'rgb(200, 200, 200)' }} />
		{/if}
	</button>
</td>

<!-- </div> -->
<!-- </tr> -->

<!-- </div> -->

<style lang="scss">
	.data {
		text-align: left;
		padding: 18px calc((27 / 1366) * 100vw);
	}

	.btn {
		background-color: transparent;
		transition: transform 300ms;
		z-index: 99;

		&:hover {
			cursor: pointer;
			transform: scale(1.2);
		}

		&.disabled {
			pointer-events: none;
		}
	}

	.disabled {
		pointer-events: none;
	}
</style>
