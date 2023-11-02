<script lang="ts">
	export let buttonClass: string = ''
	export let form: string = ''
	export let handleClick: Function | null = null

	const iclick = (e?: any) => {
		if (handleClick) {
			e ? handleClick(e) : handleClick()
		}
	}
</script>

{#if form.length !== 0}
	<button class="btn {buttonClass}" {form} on:click={iclick}>
		<slot />
	</button>
{:else}
	<button class="btn {buttonClass}" on:click={iclick}>
		<slot />
	</button>
{/if}

<style lang="scss">
	.btn {
		width: 108px;
		height: 45px;
		margin: 0;
		font-size: 18px;
		background-color: var(--primary);
		color: #fff;
		border-radius: 8px;
		overflow: hidden;

		&--sm {
			height: 32px;
			width: auto;
			padding: 0 11px;
		}

		&--md {
			height: 41px;
			padding: 0 8px;
		}

		&--filled {
			position: relative;

			&::after {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;

				background-color: #fff;
				opacity: 0;
				transition: opacity 300ms;
			}

			&:hover {
				&::after {
					opacity: 0.3;
				}
			}
		}

		&--transparent {
			background-color: transparent;
			color: var(--primary);
			border: var(--primary) 1px solid;
			transition: all 300ms;

			&:hover {
				background-color: var(--primary);
				color: #fff;
			}
		}

		&--right {
			margin-left: auto;
		}
	}
</style>
