<script lang="ts" context="module">
	export interface InitialStatePurchase {
		orderNumber: string
		customerName: string
		status: string
		behaviourSizeCheck: boolean
		model: string
		motor: string
		size: string
		arrivalDate: string
		marketPrice: number
		sellingPrice: number
		image: string
	}
</script>

<script lang="ts">
	import { enhance } from '$app/forms'
	import { goto } from '$app/navigation'
	import DetailWrapper from '@/components/DetailWrapper.svelte'

	import InputDate from '@/components/InputDate.svelte'
	import InputName from '@/components/InputName.svelte'
	import InputNumber from '@/components/InputNumber.svelte'
	import Row from '@/components/Row.svelte'
	import Select from '@/components/Select.svelte'
	import { convertDataToBase64 } from '@/libs/formatters'
	import type { Purchase, Status } from '@/libs/purchaseTypes'
	import { debounce } from '@/libs/utils'
	import { purchases } from '@/stores/purchases'
	import ResultModal from '@/views/modals/ResultModal.svelte'

	let confirmationPageIsShown = false

	let initialState: InitialStatePurchase = {
		orderNumber: '',
		customerName: '',
		status: '',
		behaviourSizeCheck: false,
		model: '',
		motor: '',
		size: '',
		arrivalDate: '',
		marketPrice: 0,
		sellingPrice: 0,
		image: ''
	}

	const goBack = () => goto('/purchases')

	const formFieldsets = [
		{
			label: '予約番号',
			id: 'orderNumber',
			error: false,
			errorMsg: '',
			type: ''
		},
		{
			label: 'お客様名',
			id: 'customerName',
			error: false,
			errorMsg: '',
			type: 'text'
		},
		{
			label: '機種',
			id: 'model',
			error: false,
			errorMsg: '',
			type: 'select',
			list: ['キューマ', 'クオラ', 'アウラ21', '楽匠Z']
		},
		{
			label: 'モーター',
			id: 'motor',
			error: false,
			errorMsg: '',
			type: 'select',
			list: ['3M', '2M', '3Mらくらく']
		},
		{
			label: 'サイズ',
			id: 'size',
			error: false,
			errorMsg: '',
			type: 'select',
			list: ['不明', '83M', '83R', '91R']
		},
		{
			label: '入荷日',
			id: 'arrivalDate',
			error: false,
			errorMsg: '',
			type: 'date'
		},
		{
			label: '運賃',
			id: 'marketPrice',
			error: false,
			errorMsg: '',
			type: 'number'
		},
		{
			label: '買取額',
			id: 'sellingPrice',
			error: false,
			errorMsg: '',
			type: 'number'
		},
		{
			label: '画像',
			id: 'image',
			error: false,
			errorMsg: '',
			type: 'File'
		}
	] as {
		label: string
		id: keyof InitialStatePurchase
		error: boolean
		errorMsg: string
		type: string
		list?: string[]
	}[]

	let fileToUpload: File

	const handleChange = async (e: any) => {
		fileToUpload = e.target.files[0]

		initialState.image = await convertDataToBase64(fileToUpload)
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
		if (!confirmationPageIsShown) {
			confirmationPageIsShown = true
			return
		}

		if (confirmationPageIsShown) {
			try {
				const localPurcharse: Purchase = {
					id: 0,
					orderNumber: '',
					customerName: '',
					status: <Status>'',
					behaviourSizeCheck: false,
					model: '',
					motor: '',
					size: '',
					arrivalDate: '',
					marketPrice: 0,
					sellingPrice: 0,
					image: ''
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

				purchases.set([...$purchases, localPurcharse])
				isShown = true
				isSucceeded = true
			} catch (error) {
				isShown = true
				isSucceeded = false
			}
		}
	}, 200)
</script>

<section class="section">
	<div class="section__main">
		<form
			class="form {confirmationPageIsShown && 'hidden'}"
			method="POST"
			id="purchase-form"
			on:submit={handleSubmit}
			enctype="multipart/form-data"
			use:enhance={({ formElement, formData, action, cancel, submitter }) => {
				//submit the form, only once it succeeded.
				isSucceeded ? submitter : cancel()

				//Don't reset the form, if there are any errors during the validation.
				return async ({ update, result }) => {
					await update({ reset: false })
				}
			}}
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
								{#if fieldset.id === 'marketPrice' || fieldset.id === 'sellingPrice'}
									<InputNumber
										label={fieldset.label}
										name={fieldset.id}
										bind:value={initialState[fieldset.id]}
									/>
								{/if}

								{#if fieldset.id === 'arrivalDate'}
									<InputDate
										label={fieldset.label}
										name={fieldset.id}
										bind:value={initialState[fieldset.id]}
									/>{/if}

								{#if fieldset.id === 'customerName'}
									<InputName
										label={fieldset.label}
										name={fieldset.id}
										bind:value={initialState.customerName}
									/>
								{/if}
							{/if}
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
									<img src={initialState.image} alt="" />
								</div>
							{/if}
						</div>
					</div>
				</fieldset>
			</div>
		</form>

		{#if confirmationPageIsShown}
			<div class="confirmation">
				<div class="container">
					<div class="fieldset fieldset--info">
						{#each formFieldsets as fieldset}
							{#if fieldset.id !== 'image'}
								<Row>
									<DetailWrapper
										id={fieldset.id}
										content={initialState[fieldset.id].toString()}
										label={fieldset.label}
									/>
								</Row>
							{/if}
						{/each}
					</div>

					<div class="picture">
						<div class="image-wrapper">
							<img src={initialState.image} alt="" />
						</div>
					</div>
				</div>
			</div>
		{/if}

		{#if isShown}
			<ResultModal {isSucceeded} on:click={() => (isSucceeded ? goBack() : (isShown = false))} />
		{/if}
	</div>

	<footer class="section__footer">
		<button type="button" class="secondary" on:click={() => (confirmationPageIsShown = false)}
			>編集</button
		>
		<button type={'submit'} class="primary" form="purchase-form"> 登録 </button>
	</footer>
</section>

<style lang="scss">
	.section {
		&__footer {
			display: flex;
			justify-content: flex-end;
			gap: 18px;
			margin-top: 18px;
			button {
				margin: 0;
			}
		}
	}

	:global(.form-row > .input-wrapper > .label) {
		width: 100px;
	}

	.container {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.wrapper {
		width: fit-content;
		border-radius: 16px;
		padding: 37px 50px;
		background-color: var(--primary);
		z-index: 200;
	}

	.form,
	.confirmation {
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

	.picture {
		position: relative;
	}

	.picture {
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
</style>
