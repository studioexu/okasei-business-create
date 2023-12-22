<script lang="ts" context="module"></script>

<script lang="ts">
	import InputDate from '@/components/InputDate.svelte'
	import InputName from '@/components/InputName.svelte'
	import InputNumber from '@/components/InputNumber.svelte'
	import Row from '@/components/Row.svelte'
	import Select from '@/components/Select.svelte'

	// const formFieldset = [
	// 	{ label: '予約番号', id: 'reservationNumber', value: '' },
	// 	{ label: 'お客様名', id: 'customerName', value: '' },
	// 	{ label: 'ステータス', id: 'status', value: '' },
	// 	{ label: '機種', id: 'model', value: '' },
	// 	{ label: 'モーター', id: 'motor', value: '' },
	// 	{ label: 'サイズ', id: 'size', value: '' },
	// 	{ label: '入荷日', id: 'arrivalDay', value: '' },
	// 	{ label: '相場', id: 'marketPrice', value: 0 },
	// 	{ label: '買取額', id: 'sellingPrice', value: 0 }
	// ]

	let initialState = {
		customerName: '',
		status: '',
		model: '',
		motor: '',
		size: '',
		arrivalDate: '',
		marketPrice: 0,
		sellingPrice: 0
	}

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
</script>

<section class="section">
	<div class="section__main">
		<form class="form" action="">
			<div class="container">
				<fieldset class="fieldset fieldset--info">
					<Row>
						<InputName
							label="お客様名"
							bind:value={initialState.customerName}
							name={'customer-name'}
						/>
					</Row>

					<Row>
						<Select
							label="機種"
							name={'model'}
							options={['キューマ', 'クオラ', 'アウラ21', '楽匠Z']}
							bind:value={initialState.model}
						/>
					</Row>
					<Row>
						<Select
							label="モーター"
							name={'motor'}
							options={['3M', '2M', '3Mらくらく']}
							bind:value={initialState.motor}
						/>
					</Row>
					<Row>
						<Select
							label="サイズ"
							name={'size'}
							options={['不明', '83M', '83R', '91R']}
							bind:value={initialState.size}
						/>
					</Row>
					<Row>
						<InputDate
							label={'入荷日'}
							name={'arrival-date'}
							bind:value={initialState.arrivalDate}
						/>
					</Row>
					<Row>
						<InputNumber
							label={'相場'}
							name={'market-price'}
							bind:value={initialState.marketPrice}
						/>
					</Row>
					<Row>
						<InputNumber
							label={'買取額'}
							name={'selling-price'}
							bind:value={initialState.sellingPrice}
						/>
					</Row>
				</fieldset>

				<fieldset class="fieldset fieldset--picture">
					<div class="wrapper">
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div class="modal-main" on:dragover|preventDefault on:drop|preventDefault={handleDrop}>
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
	</div>

	<footer class="section__footer">
		<button class="primary">登録</button>
	</footer>
</section>

<style lang="scss">
	.section {
		&__footer {
			margin-top: 18px;
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

	.modal-main {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		// width: calc((898 / 1366) * 100vw);
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

		&::backdrop {
			border-color: red;
		}
	}

	.modal-footer {
		display: flex;
		justify-content: center;
		margin-top: 26px;
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

	.secondary {
		color: #fff;
		border-color: #fff;
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
