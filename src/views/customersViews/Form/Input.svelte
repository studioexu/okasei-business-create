<script context="module">
</script>

<script lang="ts">
	import type { AddressAutoInfo } from '@/routes/customers/utils/types'
	import Button from '@/components/Button.svelte'
	import { inputIsValid } from '@/routes/customers/utils/validations'

	export let placeholder: string = ''
	export let value: string = ''
	export let name: string
	export let label: string = ''
	export let inputClass: string = ''
	export let autoSearch = false
	export let labelClass: string = ''
	export let unit: string = ''
	export let wrapperClass: string = ''
	export let isValid: boolean = true
	export let required: boolean = false
	export let errorMsg: string = ''
	export let extraCheckFunction: Function | null = null
	export let address: AddressAutoInfo = {
		prefecture: '',
		city: '',
		address1: ''
	}

	let disabled: boolean

	name === 'customer-number' ? (disabled = true) : (disabled = false)

	/**
	 * Check if the value of the input is valid, when the focus is not on the input.
	 * @param e
	 */
	const handleBlurInput = (e: any) => {
		const input = e.target.value
		isValid = inputIsValid(name, input)

		if (extraCheckFunction) {
			value = extraCheckFunction(input)
		}
	}

	/**
	 * Check if the input is valid, when the input is updated.
	 * @param value: input's value
	 */
	const checkValueOnChange = (value: string) => {
		if (!isValid) {
			isValid = inputIsValid(name, value)
		}
	}

	/**
	 * Fetch the address corresponding to the postal code.
	 * @param e
	 */
	const handlePostalCodeSearchSubmit = async (e: any) => {
		e.preventDefault()
		if (isValid) {
			const api = 'https://zipcloud.ibsnet.co.jp/api/search?zipcode='
			const postalCode = value
			const url = api + postalCode

			await fetch(url)
				.then(res => res.json())
				.then(data => {
					const results = data.results[0]

					address.prefecture = results.address1
					address.city = results.address2
					address.address1 = results.address3
				})
				.catch(err => console.log(err))
		}
	}

	$: checkValueOnChange(value)
</script>

<div class="input-wrapper {wrapperClass} {isValid ? '' : 'error'}">
	{#if label}
		<label class="label {labelClass}" for={name}>
			{label}
			<span class="required-mark">{required ? '*' : ''}</span>
		</label>
	{/if}

	<div class="input-w">
		<input
			type="text"
			class="input {inputClass}"
			id={name}
			{name}
			{placeholder}
			bind:value
			on:blur={handleBlurInput}
			on:focus={() => (isValid = true)}
			{disabled}
		/>
		<span class="error-msg">{errorMsg}</span>
	</div>

	{#if autoSearch && name === 'postalCode'}
		<Button buttonClass={'btn--sm btn--filled'} handleClick={handlePostalCodeSearchSubmit}>
			自動検索
		</Button>
	{/if}

	{#if unit !== ''}
		<span class="unit">{unit}</span>
	{/if}
</div>

<style lang="scss">
	@mixin responsiveInputWidth($width) {
		width: calc((($width - 10 - 2) / 1366) * 100vw);
	}

	.input-wrapper {
		position: relative;
		display: flex;
		gap: 10px;
		align-items: center;
		margin-bottom: 20px;

		.label {
			width: max-content;
			font-size: 18px;
			font-weight: 500;

			&-width {
				&--md {
					min-width: 74px;
				}
				&--lg {
					min-width: 130px;
				}
			}
		}
		.input {
			height: 32px;
			padding-left: 10px;
			border: 1px solid var(--gray);
			border-radius: 8px;

			&::placeholder {
				color: rgb(206, 205, 205);
			}

			&:focus {
				border-color: var(--primary-color);
			}
		}
	}

	.mb-0 {
		margin-bottom: 0;
	}

	.number {
		&--sm {
			@include responsiveInputWidth((58));
		}
		&--md {
			@include responsiveInputWidth((103));
		}
		&--lg {
			@include responsiveInputWidth((152));
		}
	}

	.txt {
		&--sm {
			@include responsiveInputWidth((114));
			@include responsiveInputWidth((152));
		}
		&--md {
			@include responsiveInputWidth((114));
			@include responsiveInputWidth((152));
		}
		&--lg {
			@include responsiveInputWidth((359));
		}
		&--xl {
			@include responsiveInputWidth((534));
		}
	}

	.error-msg {
		position: absolute;
		right: 0;
		bottom: -14px;
		color: var(--error);
		font-size: 10px;
		font-weight: 600;
		min-width: 250px;
		text-align: right;
		opacity: 0;
	}

	.error {
		.input {
			transition: border 300ms;
			border: 1.5px solid var(--error);
			animation: buzz 100ms;
			animation-iteration-count: 3;
		}

		.error-msg {
			opacity: 1;
			transition: all 300ms;
		}
	}

	.input-w {
		position: relative;
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

	.required-mark {
		color: var(--error);
	}
</style>
