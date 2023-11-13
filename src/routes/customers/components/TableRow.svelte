<script lang="ts">
	import Icon from '@/components/Icon.svelte'

	export let customerName: string = ''
	export let address = { prefecture: '', city: '' }
	export let isActive: boolean
	export let updateDate: string = ''
	export let id: string = ''
	export let status: string
	export let currentUser: string = ''
	export let isShown: boolean = false

	$: currentUser

	const handleDeleteItem = async (e: any) => {
		isShown = true
		currentUser = id
	}

	const handleEditItem = async (e: any) => {
		window.location.href = '/customers/' + id + '/edit'
	}
</script>

<td class="data customer-number">{id}</td>
<td class="data facility-name">{customerName}</td>
<td class="data address">{address.prefecture}{address.city}</td>
<td class="data update-date">{status}日 {updateDate}</td>
<td class="data update">
	<button class="btn btn--update {isActive ? '' : 'disabled'}" on:click={handleEditItem}>
		{#if isActive}
			<Icon icon={{ path: 'edit', color: 'primary' }} />
		{:else}
			<Icon icon={{ path: 'edit', color: 'rgb(200, 200, 200)' }} />
		{/if}
	</button>
</td>
<td class="data erase">
	<button class="btn btn--delete {isActive ? '' : 'disabled'}" {id} on:click={handleDeleteItem}>
		{#if isActive}
			<Icon icon={{ path: 'delete', color: 'primary' }} />
		{:else}
			<Icon icon={{ path: 'delete', color: 'rgb(200, 200, 200)' }} />
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

		> :global(.svg-icon) {
			height: 18px * 1.2;
		}
	}

	.disabled {
		pointer-events: none;
	}
</style>
