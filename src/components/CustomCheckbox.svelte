<script lang="ts">
	export let value: string = ''
	export let isChecked: boolean = false

	const handleChange = (e: any) => {
		isChecked = e.target.checked
	}
</script>

<label class="checkbox-container" for={value}>
	{value}
	<input
		class="checkbox"
		type="checkbox"
		name={value}
		id={value}
		{value}
		on:change={handleChange}
		checked={isChecked}
	/>
	<span class="checkmark" />
</label>

<style lang="scss">
	.checkbox-container {
		position: relative;
		display: flex;
		justify-content: flex-end;
		flex-direction: row-reverse;
		align-items: center;
		width: 100%;
		margin-bottom: 12px;
		gap: 18px;
		font-size: 18px;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
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
