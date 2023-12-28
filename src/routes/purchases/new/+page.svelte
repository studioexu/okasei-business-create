<script lang="ts" context="module"></script>

<script lang="ts">
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'
	import Input from '@/components/Input.svelte'

	import InputDate from '@/components/InputDate.svelte'
	import InputName from '@/components/InputName.svelte'
	import InputNumber from '@/components/InputNumber.svelte'
	import Row from '@/components/Row.svelte'
	import Select from '@/components/Select.svelte'
	import type { Purchase, Status } from '@/libs/purchaseTypes'
	import { debounce, toNumber } from '@/libs/utils'
	import { purchases } from '@/stores/purchases'
	import Form from '@/views/customersViews/Form.svelte'
	import ResultModal from '@/views/modals/ResultModal.svelte'

	interface InitialStatePurchase {
		orderNumber: string
		customerName: string
		status: string
		model: string
		motor: string
		size: string
		arrivalDate: string
		marketPrice: number
		sellingPrice: number
	}

	let initialState: InitialStatePurchase = {
		orderNumber: '',
		customerName: '',
		status: '',
		model: '',
		motor: '',
		size: '',
		arrivalDate: '',
		marketPrice: 0,
		sellingPrice: 0
	}

	const goBack = () => goto('/purchases')

	const formFieldsets = [
		{
			label: '予約番号',
			id: 'orderNumber',
			value: '',
			error: false,
			errorMsg: '',
			type: ''
		},
		{
			label: 'お客様名',
			id: 'customerName',
			value: '',
			error: false,
			errorMsg: '',
			type: 'name'
		},
		{
			label: '機種',
			id: 'model',
			value: '',
			error: false,
			errorMsg: '',
			type: 'select',
			list: ['キューマ', 'クオラ', 'アウラ21', '楽匠Z']
		},
		{
			label: 'モーター',
			id: 'motor',
			value: '',
			error: false,
			errorMsg: '',
			type: 'select',
			list: ['3M', '2M', '3Mらくらく']
		},
		{
			label: 'サイズ',
			id: 'size',
			value: '',
			error: false,
			errorMsg: '',
			type: 'select',
			list: ['不明', '83M', '83R', '91R']
		},
		{
			label: '入荷日',
			id: 'arrivalDay',
			value: '',
			error: false,
			errorMsg: '',
			type: 'date'
		},
		{
			label: '相場',
			id: 'marketPrice',
			value: 0,
			error: false,
			errorMsg: '',
			type: 'number'
		},
		{
			label: '買取額',
			id: 'sellingPrice',
			value: 0,
			error: false,
			errorMsg: '',
			type: 'number'
		}
	] as {
		label: string
		id: keyof InitialStatePurchase
		value: string | number
		error: boolean
		errorMsg: string
		type: string
		list?: string[]
	}[]

	let fileToUpload: File

	const handleChange = (e: any) => {
		fileToUpload = e.target.files[0]
	}

	const handleDrop = (e: any): void => {
		const inputFile: HTMLInputElement | null = document.querySelector('.input-file')

		if (inputFile !== null && e.dataTransfer.files !== null) {
			inputFile.files = e.dataTransfer.files
			if (inputFile.files !== null) fileToUpload = inputFile.files[0]
		}
	}

	let isShown = false
	let isSucceeded = false

	/**
	 * Triggered when the form is submit.
	 * If the form is still on the entry page, then, it will preventDefault, and displayed the entry verification page.
	 * If the user is in the entry verification page, then, we submit the form.
	 * @param e
	 */
	const handleSubmit = debounce(async (event: Event) => {
		event.preventDefault()
		try {
			const formData = new FormData()

			for (const key in initialState)
				formData.append(key, <string>initialState[key as keyof InitialStatePurchase])

			const localPurcharse: Purchase = {
				id: 0,
				orderNumber: '',
				customerName: '',
				status: <Status>'',
				model: '',
				motor: '',
				size: '',
				arrivalDate: '',
				marketPrice: 0,
				sellingPrice: 0
			}

			for (let key in localPurcharse) {
				key = <keyof InitialStatePurchase>key

				if (localPurcharse.hasOwnProperty(key)) {
					switch (key) {
						case 'orderNumber':
							localPurcharse[key] = initialState[key]
							break

						case 'status':
							localPurcharse[key] = <Status>initialState[key]
							break

						case 'model':
						case 'motor':
						case 'customerName':
						case 'size':
						case 'arrivalDate':
							localPurcharse[key] = initialState[key]
							break

						case 'marketPrice':
						case 'sellingPrice':
							localPurcharse[key] = initialState[key]
					}
				}
			}
			Object.keys(initialState).map(key => console.log(key))
			// console.log()

			console.log(localPurcharse)

			purchases.set([...$purchases, localPurcharse])
			isShown = true
			isSucceeded = true
		} catch (error) {
			isShown = true
			isSucceeded = false
		}
	}, 200)
</script>

<section class="section">
	<div class="section__main">
		<form
			class="form"
			method="POST"
			action="/purchases/new?/create"
			id="purchase-form"
			use:enhance
			on:submit={handleSubmit}
		>
			<input type="hidden" name="initialState" value={JSON.stringify(initialState)} />

			<div class="container">
				<fieldset class="fieldset fieldset--info">
					{#each formFieldsets as fieldset}
						<Row>
							{#if fieldset.list}
								<Select
									label={fieldset.label}
									name={fieldset.id}
									options={fieldset.list}
									bind:value={initialState[fieldset.id]}
								/>
							{:else}
								<div class="input-wrapper">
									<label class="label" for={fieldset.id}>{fieldset.label}</label>
									<input
										class="input"
										type={fieldset.type}
										name={fieldset.id}
										id={fieldset.id}
										value={initialState[fieldset.id]}
									/>
								</div>
							{/if}

							<!-- {#if fieldset.type === 'number' && typeof initialState[fieldset.id] === 'number'}
								<InputNumber
									label={fieldset.label}
									name={fieldset.id}
									bind:value={initialState[fieldset.id]}
								/>
							{/if}

							{#if fieldset.type === 'date'}
								<InputDate
									label={fieldset.label}
									name={fieldset.id}
									bind:value={initialState[fieldset.id]}
								/>{/if}

							{#if fieldset.type === 'name'}
								<InputName label={fieldset.label} name={fieldset.id} bind:value={fieldset.value} />
							{/if} -->
						</Row>
					{/each}
				</fieldset>

				<fieldset class="fieldset fieldset--picture">
					<div class="wrapper">
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div class="upload-zone" on:dragover|preventDefault on:drop|preventDefault={handleDrop}>
							{#if fileToUpload === undefined}
								<p>ここにファイルをドラッグ&ドロップ</p>
								<p>または</p>
								<input
									type="file"
									id="file"
									class="hidden input-file"
									name="file"
									accept="image/png, image/jpeg, .pdf"
									on:change={handleChange}
								/>
								<label class="primary modal-btn" for="file"> ファイルを選択する </label>
								<p>アップロードできるファイル形式は、JPEG/PNG/PDFのみです。</p>
							{/if}

							{#if fileToUpload !== undefined}
								<div class="image-wrapper">
									<img src={URL.createObjectURL(fileToUpload)} alt="" />
								</div>
							{/if}
						</div>
					</div>
				</fieldset>
			</div>
		</form>

		{#if isShown}
			<ResultModal {isSucceeded} on:click={() => (isSucceeded ? goBack() : (isShown = false))} />
		{/if}
	</div>

	<footer class="section__footer">
		<button type="submit" class="primary" form="purchase-form">登録</button>
	</footer>
</section>

<style lang="scss">
	.section {
		&__footer {
			margin-top: 18px;
		}
	}

	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		width: fit-content;
		gap: 10px;

		.label {
			align-self: flex-start;
			display: flex;
			align-items: center;
			height: 31px;
		}
	}

	:global(.form-row > .input-wrapper > .label) {
		width: 100px;
	}

	.container {
		display: flex;
		justify-content: space-between;
	}

	.wrapper {
		width: fit-content;
		border-radius: 16px;
		padding: 37px 50px;
		background-color: var(--primary);
		z-index: 200;
	}

	.form {
		width: auto;
		padding: 0 37px;
		padding-top: 28px;
		padding-bottom: 48px;
		background-color: #fff;
		border-radius: 16px;
		box-shadow: 0px 8px 8px rgb(200, 200, 200);
	}

	.upload-zone {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		min-height: 260px;
		padding: 30px 18%;

		border: 2px dashed #fff;
		border-radius: 12px;
		text-align: center;

		aspect-ratio: 16/9;

		p {
			font-size: 20px;
			font-weight: bold;
			color: #fff;
		}

		.modal-btn {
			margin: 20px auto;
		}
	}

	.modal-btn {
		display: inline-block;
		padding: 8px 16px;
		min-width: 112px;
		overflow: hidden;
		border-radius: 8px;
		background-color: #fff;
		color: var(--black);
	}

	.image-wrapper {
		overflow: hidden;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		border-radius: 8px;
		img {
			position: absolute;
			height: 100%;
			width: 100%;
			left: 0;
			top: 0;
			object-position: center;
			object-fit: contain;
		}
	}

	.hidden {
		display: none;
	}
</style>
