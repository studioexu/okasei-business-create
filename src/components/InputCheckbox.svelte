<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	export let isChecked: boolean = false
	export let name: string
	export let label: string

	const dispatch = createEventDispatcher()

	const handleChange = (e: any) => {
		isChecked = e.target.checked

		dispatch('checked', {
			isChecked: e.target.checked
		})
	}
</script>

<label class="checkbox-container" for={name}>
	<input
		class="checkbox"
		type="checkbox"
		{name}
		id={name}
		value={name}
		on:change={handleChange}
		checked={isChecked}
	/>
	{label}
	<span class="checkmark" />
</label>

<style lang="scss">
	.checkbox-container {
		cursor: pointer;
		position: relative;
		display: flex;
		justify-content: flex-end;
		flex-direction: row-reverse;
		align-items: center;
		height: 31px;
		gap: 18px;
		font-size: 18px;
		user-select: none;

		& :hover {
			.checkbox ~ .checkmark {
				background-color: #ccc;
			}
		}

		& :after {
			content: '';
			display: none;
		}

		.checkmark {
			display: flex;
			align-items: center;
			justify-content: center;
			top: 0;
			left: 0;
			height: 20px;
			width: 20px;
			border: 1px solid var(--black);
			border-radius: 3px;
			background-color: #fff;

			&:after {
				width: 3px;
				height: 8px;
				border: solid white;
				border-width: 0 3px 3px 0;
				-webkit-transform: rotate(45deg);
				-ms-transform: rotate(45deg);
				transform: rotate(45deg);
			}
		}

		.checkbox {
			position: absolute;
			height: 0;
			width: 0;
			opacity: 0;
			cursor: pointer;

			&:checked ~ .checkmark {
				background-color: var(--primary);

				&:after {
					display: block;
				}
			}
		}
	}
</style>
