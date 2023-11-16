<script lang="ts" context="module">
	import { createEventDispatcher } from 'svelte'
</script>

<script lang="ts">
	export let phase: 'shown' | 'success' | 'error' = 'shown'

	let fileToUpload: File

	const handleChange = (e: any) => {
		console.log(e.target.files[0])
		fileToUpload = e.target.files[0]
	}

	const dispatch = createEventDispatcher()
	const onClick = (key: string) => dispatch('click', { key, fileToUpload })

	const handleDrop = (e: any) => {
		e.preventDefault()
	}
</script>

<div class="modal upload-modal">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="back" on:click={() => onClick('cancel')} />

	<div class="container">
		{#if phase === 'shown'}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="modal-main" on:drop={handleDrop}>
				{#if fileToUpload === undefined}
					<p>ここにファイルをドラッグ&ドロップ</p>
					<p>または</p>
					<input
						type="file"
						id="file"
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
				<button type="button" class="secondary" on:click={() => onClick('cancel')}
					>キャンセル</button
				>
				<button type="button" class="primary modal-btn" on:click={() => onClick('upload')}
					>アップロード</button
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
		width: calc((898 / 1366) * 100vw);
		min-height: 260px;
		padding: 30px 18%;
		border: 2px dashed #fff;
		text-align: center;
		border-radius: 12px;

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
		background-color: #fff;
		color: var(--black);
		min-width: 112px;
		border-radius: 8px;
		padding: 8px 16px;
	}

	.secondary {
		color: #fff;
		border-color: #fff;
	}

	.image-wrapper {
		position: absolute;
		width: 100%;
		height: 100%;

		top: 0;
		left: 0;
		img {
			position: absolute;
			height: 100%;
			width: 100%;
			left: 0;
			top: 0;
			object-fit: contain;
		}
	}
</style>
