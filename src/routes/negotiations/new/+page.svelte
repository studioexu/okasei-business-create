<script lang="ts" context="module"></script>

<script lang="ts">
	import NegociationInfo from './views/Form/NegociationInfo.svelte'
	import NegociationInfoConfirmation from './views/Confirmation/NegociationInfoConfirmation.svelte'
	let isShown = false

	let confirmationPageIsShown = false

	const updateIndexArray = (maxIndex: number) => {
		const array: string[] = []
		for (let i = 0; i < maxIndex; i++) {
			array.push(i.toString())
		}

		return array
	}

	let initialState2 = {
		status: '',
		startingDate: '',
		condition: '',
		inflow: '',
		preference: '',
		billingDate: '',
		scheduledDeposit: '',
		paymentMethod: '',
		outcome: '',
		nextContact: '',
		lastContact: '',
		postalCode: '',
		prefecture: '',
		city: '',
		address1: '',
		address2: '',
		distanceKm: '',
		distanceTime: '',
		estimate: [],
		importantMemo: [],
		employeeInCharge: '',
		responsiblePerson: '',
		communication: '',
		directMessage: '',
		videoUrl: '',
		checkboxes: [],
		checkBottleneck: '',
		occasion: '',
		risk: '',
		outcomeHistory: []
	}

	let initialState2Errors = {
		status: false,
		startingDate: false,
		condition: false,
		inflow: false,
		preference: false,
		billingDate: false,
		scheduledDeposit: false,
		paymentMethod: false,
		outcome: false,
		nextContact: false,
		postalCode: false,
		prefecture: false,
		city: false,
		address1: false,
		address2: false,
		distanceKm: false,
		distanceTime: false,
		estimate: false,
		importantMemo: false,
		employeeInCharge: false,
		responsiblePerson: false,
		communication: false,
		directMessage: false,
		videoUrl: false,
		checkboxes: false,
		checkBottleneck: false,
		occasion: false,
		risk: false
	}

	let displayClass: string = ''
	$: displayClass

	const initialStateIsValid = (initialStateErrors: Object) => {
		let isValid = true
		Object.keys(initialStateErrors).forEach(key => {
			console.log(initialStateErrors[key as keyof Object])
			if (initialStateErrors[key as keyof Object]) {
				return (isValid = false)
			}
		})

		return isValid
	}
</script>

<section class="section">
	<header class="section__header">
		{#if confirmationPageIsShown}
			<h2>下記の内容で登録しますか？</h2>
		{/if}
	</header>

	<div class="section__main">
		{#if !confirmationPageIsShown}
			<NegociationInfo bind:initialState2 />
		{:else}
			<NegociationInfoConfirmation {initialState2} />
		{/if}
	</div>

	<footer class="section__footer">
		<div class="container">
			{#if confirmationPageIsShown}
				<button
					type="button"
					class="btn secondary"
					on:click={() => (confirmationPageIsShown = false)}>編集</button
				>
			{/if}
			<button type="button" class="btn primary" on:click={() => (confirmationPageIsShown = true)}
				>登録</button
			>
		</div>
	</footer>
</section>

<style lang="scss">
	.section {
		font-family: 'Noto Sans JP';

		&__main {
			background-color: #fff;
			border-radius: 16px;
			padding: 0 37px;
			padding-top: 28px;
			padding-bottom: 48px;
			margin-top: 20px;
		}
	}

	.container {
		display: flex;
		justify-content: flex-end;
		gap: 18px;
		margin-top: 20px;
	}

	.btn {
		margin: 0;
	}

	:global(button.error) {
		color: var(--error);
		border-color: var(--error);
	}
</style>
