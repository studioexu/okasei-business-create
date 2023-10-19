<script lang="ts">
	import type { CustomerEntries, CustomerEntriesErrors } from '@/routes/customers/utils/types'
	import { inputIsValid } from '@/routes/customers/utils/validations'
	import Button from '@/components/customers/Button.svelte'

	export let initialState: CustomerEntries
	export let noErrors: CustomerEntriesErrors
	export let verificationPageDisplayed: boolean = false

	const handleEditClicked = () => {
		verificationPageDisplayed = false
	}

	/**
	 * Take the form and check if all the entries are valid.
	 * If there is one error, the function will return false.
	 * @param formEntries: Object of entries
	 * @returns boolean
	 */
	const checkIfFormIsValid = (formEntries: Object): boolean => {
		let errorArray: boolean[] = []
		let isValid = true
		const customerKeys = Object.keys(formEntries)
		const customerValues = Object.values(formEntries)

		for (let i = 0; i < customerKeys.length; i++) {
			const name: string = customerKeys[i]
			const input: string = customerValues[i]

			noErrors[name as keyof CustomerEntriesErrors] = inputIsValid(name, input)
			errorArray.push(!inputIsValid(name, input))
		}

		errorArray.forEach(error => {
			if (error) {
				isValid = false
			}
		})

		return isValid
	}

	const handleCheckForm = () => {
		verificationPageDisplayed = checkIfFormIsValid(initialState)
	}
</script>

<footer class="section__footer">
	<div class="form__footer">
		{#if verificationPageDisplayed}
			<Button buttonClass={'btn--transparent'} handleClick={handleEditClicked}>修正</Button>
			<Button buttonClass={'btn--filled'} form="registration-form">登録</Button>
		{:else}
			<Button buttonClass={'btn--filled'} handleClick={handleCheckForm}>登録</Button>
		{/if}
	</div>
</footer>

<style>
	.form__footer {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		margin-top: 1.5rem;
		padding-bottom: 24px;
	}
</style>
