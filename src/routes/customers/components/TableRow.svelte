<script lang="ts">
	export let customerNumber: string = ''
	export let facilityName: string = ''
	export let address = { prefecture: '', city: '' }
	export let status: string = ''
	export let updateDate: string = ''
	export let index: number
</script>

<tr class="row" id={index.toString()}>
	<td class="customer-number">{customerNumber}</td>
	<td class="facility-name">{facilityName}</td>
	<td class="address">{address.prefecture}県{address.city}市</td>
	<td class="status">{status}</td>
	<td class="update-date">{updateDate}</td>
	<td class="update">update</td>
	<td class="erase">erase</td>
</tr>

<style>
	td {
		text-align: left;
		padding: 18px calc((27 / 1366) * 100vw);
		border-bottom: #2fa8e1 1px solid;

		/* // &:nth-child(1) {
		// 	width: 75px;
		// }

		// &:nth-child(2) {
		// 	width: 200px;
		// }

		// &:nth-child(3) {
		// 	width: 150px;
		// }

		// &:nth-child(4) {
		// 	width: 43px;
		// }

		// &:nth-child(5) {
		// 	width: 150px;
		// }

		// &:nth-child(6) {
		// 	width: 25px;
		// }
		// &:nth-child(7) {
		// 	width: 25px;
		// } */
	}

	/* .row {
		// width: 100%;
		// display: grid;
		// grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		// grid-template-areas: 'customer-number facility-name facility-name address status date . . . update erase';

		// .customer-number {
		// 	grid-area: 'customer-number';
		// }
		// .facility-name {
		// 	grid-area: 'facility-name';
		// }

		// .address {
		// 	grid-area: 'address';
		// }

		// .status {
		// 	grid-area: 'status';
		// }

		// .update-date {
		// 	grid-area: 'date';
		// }

		// .update {
		// 	grid-area: 'update';
		// }

		// .erase {
		// 	grid-area: 'erase';
		// }

		// width: 100%;
		// display: flex;
		// justify-content: flex-start;
		// padding: 18px calc((27 / 1366) * 100vw);
		// border-bottom: red 1px solid;
		// gap: 18px;
		// align-items: center;

		// .update {
		// 	margin-right: auto;
		// }
	} */
</style>
