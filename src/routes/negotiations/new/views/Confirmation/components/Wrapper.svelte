<script lang="ts">
	export let label: string = ''
	export let content: string = ''
</script>

<div class="wrapper">
	<h3 class="label">{label}</h3>
	<p class="content">{content}</p>
</div>

<style lang="scss">
	.label {
		font-size: 18px;
		font-weight: 400;
		width: 130px;
		align-self: flex-start;
	}

	.wrapper {
		display: flex;
		align-items: center;
		gap: 18px;

		&:first-child {
			.label {
				width: 130px;
			}
		}
	}
</style>
