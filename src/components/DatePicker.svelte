<script lang="ts">
	export let label: string = ''
	export let value: string
	export let name: string
</script>

<div class="input-wrapper">
	{#if label !== ''}
		<label class="label" for={name}>{label}</label>
	{/if}
	<input type="date" id={name} {name} bind:value />
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

		input {
			height: 31px;
		}

		.input {
			&::placeholder {
				color: rgb(206, 205, 205);
			}

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

	.error {
		.input {
			transition: border 300ms;
			border-color: var(--error);
			animation: buzz 100ms;
			animation-iteration-count: 3;
		}

		.font-error {
			opacity: 1;
			transition: all 300ms;
		}
	}

	.required-mark {
		color: var(--error);
	}

	@keyframes buzz {
		0% {
			transform: translateX(0px);
		}

		50% {
			transform: translateX(-10px);
		}

		100% {
			transform: translateX(10px);
		}
	}
</style>
