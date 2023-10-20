<script lang="ts">
	import Icon from '@/components/Icon.svelte'
	import { flip } from 'svelte/animate'
	import { fade, fly } from 'svelte/transition'
	import { crossfade } from 'svelte/transition'
	export let facilityName: string = ''
	export let address = { prefecture: '', city: '' }
	export let isActive: boolean
	export let updateDate: string = ''
	export let id: string = ''
	export let status: string

	export let itemId: string = ''
	$: itemId

	const [send, receive] = crossfade({})

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
<td class="data facility-name">{facilityName}</td>
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
	// .row {
	// 	position: relative;
	// 	// display: block;
	// 	cursor: pointer;
	// 	// background-color: pink;
	// 	// transform-origin: 0 0;

	// 	&.deleted {
	// 		background-color: rgb(229, 229, 229);

	// 		// animation: deleted 2000ms forwards;

	// 		.data {
	// 			.btn {
	// 				pointer-events: none;
	// 			}
	// 		}
	// 	}

	// 	&:hover {
	// 		background-color: hsl(199, 75%, 53%, 0.1);
	// 	}
	// }

	.data {
		text-align: left;
		padding: 18px calc((27 / 1366) * 100vw);
		// border-bottom: #2fa8e1 1px solid;
	}

	// .row:last-child .data {
	// 	border: none;
	// }

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

	.delete {
		animation: deleted 1000ms forwards;
	}

	@keyframes deleted {
		0% {
			opacity: 1;
			// transform: translateX(0);
			transform: scaleY(1);
			// height: auto;
		}

		90% {
			opacity: 0;
			// transform: translateX(200);
			transform: scaleY(0);
			// height: 0;
		}

		100% {
			opacity: 0;
			transform: scaleY(0);
			display: none;
		}
	}
</style>
