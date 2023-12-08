<script lang="ts" context="module">
	import { createEventDispatcher } from 'svelte'
</script>

<script lang="ts">
	export let phase: 'shown' | 'success' | 'error' = 'shown'

	let fileToUpload: File

	const handleChange = (e: any) => {
		fileToUpload = e.target.files[0]
	}

	const dispatch = createEventDispatcher()
	const onClick = (key: string) => dispatch('click', { key, fileToUpload })

	const handleDrop = (e: any): void => {
		const inputFile: HTMLInputElement | null = document.querySelector('.input-file')

		if (inputFile !== null && e.dataTransfer.files !== null) {
			inputFile.files = e.dataTransfer.files
			if (inputFile.files !== null) fileToUpload = inputFile.files[0]
		}
	}
</script>

<div class="modal upload-modal">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="back" on:click={() => onClick('cancel')} />

	<div class="container">
		{#if phase === 'shown'}
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

			<div class="modal-footer">
				<button type="button" class="secondary" on:click|preventDefault={() => onClick('cancel')}
					>キャンセル</button
				>
				<button
					type="button"
					class="primary modal-btn"
					on:click|preventDefault={() => onClick('upload')}>アップロード</button
				>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.modal {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		height: 100vh;
		width: 100vw;
		left: 0;
		top: 0;
		z-index: 100;

		.back {
			position: absolute;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background: var(--modal-back);
			cursor: pointer;
		}

		.container {
			width: fit-content;
			border-radius: 16px;
			padding: 37px 50px;
			background-color: var(--primary);
			z-index: 200;
		}
	}

	.modal-main {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		width: calc((898 / 1366) * 100vw);
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
