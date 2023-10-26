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
	$primary-color: #2fa8e1;
	$white: #fff;

	.btn {
		width: 108px;
		height: 45px;
		margin: 0;
		background-color: $primary-color;
		color: $white;
		border-radius: 3px;
		overflow: hidden;

		&--sm {
			height: 32px;
			width: auto;
			padding: 0 11px;
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
			color: #2fa8e1;
			border: #2fa8e1 1px solid;
			transition: all 300ms;

			&:hover {
				background-color: #2fa8e1;
				color: #fff;
			}
		}

		&--round {
			width: 182px;
			height: 43px;
			border: 1px solid #707070;
			color: #707070;
			background-color: #fff;
			border-radius: 24px;
			&:hover {
				background-color: #707070;
				color: #fff;
			}

			&--delete {
				background-color: rgb(47, 168, 225);
				border-color: rgb(47, 168, 225);
				color: #fff;
				transition: all 300ms;

				&:hover {
					background-color: red;
					border-color: red;
				}
			}
		}

		&--right {
			margin-left: auto;
		}
	}
</style>
