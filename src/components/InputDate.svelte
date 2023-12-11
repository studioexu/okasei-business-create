<script lang="ts">
	export let label: string = ''
	export let value: string
	export let name: string
</script>

<div class="input-wrapper">
	{#if label !== ''}
		<label class="label" for={name}>{label}</label>
	{/if}
	<input class="input" type="date" id={name} {name} bind:value />
</div>

<style lang="scss">
	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		width: fit-content;
		gap: 10px;

		&:first-child {
			.label {
				width: 130px;
			}
		}

		.input {
			&:focus {
				border-color: var(--primary-color);
			}
		}

		.font-error {
			position: absolute;
			right: 0;
			bottom: -14px;
			font-size: 10px;
			opacity: 0;
		}
	}
</style>
