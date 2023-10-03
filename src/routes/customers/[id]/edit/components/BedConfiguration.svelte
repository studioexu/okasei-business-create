<script lang="ts">
	import Input from './Input.svelte'
	import Select from './Select.svelte'
	export let wrapperClass: string = ''

	export const department: string[] = ['内科', '外科', '診療内科']
</script>

<div class="bed-configuration">
	<Select options={department} wrapperClass="mb-0" />

	<Input additionalClass="number--lg" name="quantity" label="病床数" wrapperClass="mb-0" />
</div>

<style lang="scss">
	.bed-configuration {
		display: flex;
		align-items: center;
		gap: 62px;
	}
</style>
