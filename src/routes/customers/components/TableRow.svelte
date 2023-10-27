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

	const handleEditItem = async (e: any) => {
		window.location.href = '/customers/' + id + '/edit'
	}
</script>

<td class="data customer-number">{id}</td>
<td class="data facility-name">{customerName}</td>
<td class="data address">{address.prefecture}{address.city}</td>
<!-- <td class="data status">{status}日</td> -->
<td class="data update-date">{status}日 {updateDate}</td>
<td class="data update">
	<button class="btn btn--update {isActive ? '' : 'disabled'}" on:click={handleEditItem}>
		{#if isActive}
			<Icon icon={{ path: 'notepad', color: '#0093d0' }} />
		{:else}
			<Icon icon={{ path: 'notepad', color: 'rgb(200, 200, 200)' }} />
		{/if}
	</button>
</td>
<td class="data erase">
	<button class="btn btn--erase {isActive ? '' : 'disabled'}" {id} on:click={handleDeleteItem}>
		{#if isActive}
			<Icon icon={{ path: 'trash-bin', color: '#0093d0' }} />
		{:else}
			<Icon icon={{ path: 'trash-bin', color: 'rgb(200, 200, 200)' }} />
		{/if}
	</button>
</td>

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
