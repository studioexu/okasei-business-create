<script lang="ts" context="module"></script>

<script lang="ts">
	export let images: any[]
	import Image1 from '@/data/images/bed.jpeg'

	console.log(images)

	$: currentIndex = 0
</script>

<div class="modal">
	<button class="primary next" on:click={() => currentIndex < images.length - 1 && currentIndex++}>
		'＞'
	</button>

	<button class="primary prev" on:click={() => currentIndex > 0 && currentIndex--}> '＜' </button>

	<div class="viewport">
		{#each images as image, index}
			<div class="picture-wrapper {currentIndex === index && 'show'}">
				<h3 class="title">{image.title}</h3>
				<img src={Image1} alt="" />
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.modal {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--primary);
		width: calc((1000 / 1366) * 100vw);
		height: calc((639 / 768) * 100vh);
		width: 80%;
		height: 80%;
		z-index: 100;
		padding: 2rem;
	}

	.viewport {
		position: relative;
		// background-color: #fff;
		height: 100%;
		width: 100%;

		img {
			// position: absolute;

			height: 100%;
			width: 100%;
		}
	}

	.picture-wrapper {
		display: none;
	}

	.picture-wrapper.show {
		display: block;
	}

	button {
		position: absolute;
		// background: green;
		top: 50%;
		transform: translateY(-50%);

		&.prev {
			left: 0;
		}

		&.next {
			right: 0;
		}
	}
</style>
