<script lang="ts">
	import Icon from './Icon.svelte'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	const handleClick = () => {
		dispatch('delete')
	}

	export let addClass: string = ''
</script>

<button type="button" class="btn secondary {addClass}" on:click={handleClick}>
	<Icon icon={{ path: 'delete', color: '#2FA8E1' }} />
</button>

<style lang="scss">
	.btn {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 31px;
		width: 31px;
		min-width: auto;
		margin: 0;
		padding: 0;
		margin-left: auto;

		&:hover {
			opacity: 0.5;
		}

		> :global(.svg-icon) {
			height: 18px * 1.2;
		}
	}

	.margin-left-0 {
		margin-left: 0;
	}
</style>
