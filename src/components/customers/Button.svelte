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
	$primary-color: #0093d0;
	$white: #fff;
	$error: #eb3c3c;
	$gray: #7b7c7d;

	.btn {
		width: 108px;
		height: 45px;
		margin: 0;
		font-size: 18px;
		background-color: var(--primary-color);
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

				background-color: $white;
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
			color: var(--primary-color);
			border: var(--primary-color) 1px solid;
			transition: all 300ms;

			&:hover {
				background-color: var(--primary-color);
				color: #fff;
			}
		}

		&--round {
			width: 182px;
			height: 43px;
			border: 1px solid var(--gray);
			color: var(--gray);
			background-color: #fff;
			border-radius: 24px;
			&:hover {
				background-color: var(--gray);
				color: #fff;
			}

			&--delete {
				background-color: var(--primary-color);
				border-color: var(--primary-color);
				color: #fff;
				transition: all 300ms;

				&:hover {
					background-color: var(--error);
					border-color: var(--error);
					opacity: 1;
				}
			}
		}

		&--right {
			margin-left: auto;
		}
	}
</style>
