<script lang="ts">
	import Icon from '@/components/Icon.svelte'
	export let customerNumber: string = ''
	export let facilityName: string = ''
	export let address = { prefecture: '', city: '' }
	export let status: string = ''
	export let updateDate: string = ''
	export let index: number
</script>

<tr class="row" id={index.toString()}>
	<td class="data customer-number">{customerNumber}</td>
	<td class="data facility-name">{facilityName}</td>
	<td class="data address">{address.prefecture}県{address.city}市</td>
	<td class="data status">{status}</td>
	<td class="data update-date">{updateDate}</td>
	<td class="data update"
		><button class="btn btn--update"><Icon icon={{ path: 'notepad', color: '#2FA8E1' }} /></button
		></td
	>
	<td class="data erase"
		><button class="btn btn--erase"><Icon icon={{ path: 'trash-bin', color: '#2FA8E1' }} /></button
		></td
	>
</tr>

<style lang="scss">
	.data {
		text-align: left;
		padding: 18px calc((27 / 1366) * 100vw);
		border-bottom: #2fa8e1 1px solid;
	}

	.btn {
		background-color: transparent;
		transition: transform 300ms;

		&:hover {
			cursor: pointer;
			transform: scale(1.2);
		}
	}
</style>
