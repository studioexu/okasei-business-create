<script lang="ts" context="module"></script>

<script lang="ts">
	import Input from '@/components/Input.svelte'
	import Icon from '@/components/Icon.svelte'
	import Select from '@/components/Select.svelte'
	import { negociation, negociations } from '@/stores/negociations'

	import DeleteModal from '@/views/modals/DeleteModal.svelte'
	import { goto } from '$app/navigation'
	import type { Negociation } from '@/libs/negociationTypes'

	let searchIsShown = false
	let displayMenuIsShown = false
	let deleteModalIsShown = false

	let filteredNegociations: Negociation[] = $negociations

	let research = {
		name: '',
		year: '',
		month: ''
	}

	const years: string[] = ['']
	const months: string[] = ['']
	const currentYear = new Date().getFullYear()
	const minYear = 2000

	for (let i = minYear; i < currentYear; i++) {
		years.push(i.toString())
	}

	for (let i = 1; i <= 12; i++) {
		months.push(i.toString())
	}

	let searchInput = {
		text: '',
		year: '',
		month: ''
	}

	const tableHeaders: { label: string; id: keyof DataIsShown }[] = [
		{ label: '施設名', id: 'customerName' },
		{ label: 'ステータス', id: 'status' },
		{ label: '商談開始日', id: 'firstTransaction' },
		{ label: '可能性', id: 'condition' },
		{ label: '流入', id: 'inflow' },
		{ label: '納期', id: 'billingDate' },
		{ label: '入金予定', id: 'scheduledDeposit' },
		{ label: '成否日', id: 'outcome' },
		{ label: '次回連絡日時', id: 'nextContact' },
		{ label: '最終連絡', id: 'lastContact' },
		{ label: '納品先', id: 'billingAddress' },
		{ label: '台数', id: 'numberOfBeds' },
		{ label: '見積金額(税抜)', id: 'billingEstimation' },
		{ label: '担当者名', id: 'personInCharge' },
		{ label: 'メモ', id: 'memo' },
		{ label: 'DM発送', id: 'dm' },
		{ label: 'PR動画', id: 'video' }
	]

	interface DataIsShown {
		negociationId: boolean
		custCd: boolean
		customerName: boolean
		status: boolean
		firstTransaction: boolean
		condition: boolean
		inflow: boolean
		billingDate: boolean
		scheduledDeposit: boolean
		outcome: boolean
		nextContact: boolean
		lastContact: boolean
		billingAddress: boolean
		numberOfBeds: boolean
		billingEstimation: boolean
		personInCharge: boolean
		memo: boolean
		dm: boolean
		video: boolean
	}

	const dataIsShown: DataIsShown = {
		customerName: true,
		status: true,
		firstTransaction: true,
		condition: true,
		inflow: true,
		billingDate: true,
		scheduledDeposit: true,
		outcome: true,
		nextContact: true,
		lastContact: true,
		billingAddress: true,
		numberOfBeds: true,
		billingEstimation: true,
		personInCharge: true,
		memo: true,
		dm: true,
		video: true,
		negociationId: false,
		custCd: false
	}

	const handleChange = (e: any) => {
		const id: keyof DataIsShown = e.target.id
		dataIsShown[id] = e.target.checked
	}

	const openModal = (index: number) => {
		currentUser = index
		deleteModalIsShown = true
	}

	let phase: 'shown' | 'success' | 'error' = 'shown'
	let currentUser: number

	const onClick = (event: { detail: { key: string } }) => {
		switch (event.detail.key) {
			case 'cancel':
				deleteModalIsShown = false
				break

			case 'delete':
				try {
					negociations.set(
						$negociations.filter(negociation => negociation.negociationId !== currentUser)
					)

					if ($negociation.negociationId === currentUser) {
						negociation.set({
							customerName: '',
							status: '',
							firstTransaction: '',
							condition: '',
							inflow: '',
							billingDate: '',
							scheduledDeposit: '',
							outcome: '',
							nextContact: '',
							lastContact: '',
							postalCode: '',
							prefecture: '',
							city: '',
							address1: '',
							address2: '',
							numberOfBeds: '',
							estimate: [],
							personInCharge: '',
							responsiblePerson: '',
							memo: [],
							dm: '',
							video: '',
							negociationId: 0,
							custCd: 0,
							checkboxes: [],
							checkBottleneck: '',
							occasion: '',
							risk: '',
							outcomeHistory: [],
							paymentMethod: '',
							communication: '',
							distanceKm: '',
							distanceTime: '',
							preference: '',
							contact: '',
							billingEstimation: ''
						})
						goto('/negotiations')
						phase = 'shown'
					} else phase = 'success'
				} catch (error) {
					phase = 'error'
				}
				break

			case 'success':
				deleteModalIsShown = false
				phase = 'shown'
				break

			case 'error':
				phase = 'shown'
				break
		}
	}

	$: {
		if (deleteModalIsShown && phase === 'success')
			setTimeout(() => {
				deleteModalIsShown = false
				phase = 'shown'
			}, 2000)
	}
</script>

<section class="section">
	{#if deleteModalIsShown}
		<DeleteModal {phase} on:click={onClick} />
	{/if}
	<header class="section__header">
		<div class="container">
			<button
				type="button"
				class="primary"
				on:click={() => (window.location.href = '/negotiations/new')}>＋新規追加</button
			>
			<button
				type="button"
				class="primary"
				on:click={() => (displayMenuIsShown = !displayMenuIsShown)}
			>
				表示・非表示
			</button>
			<button type="button" class="primary" on:click={() => (searchIsShown = !searchIsShown)}>
				絞り込み検索
			</button>
		</div>

		{#if displayMenuIsShown}
			<div class="container data-to-display">
				{#each tableHeaders as header}
					{#if header.id !== 'customerName'}
						<label class="checkbox-container" for={header.id}>
							<input
								class="checkbox"
								type="checkbox"
								name={header.id}
								id={header.id}
								checked
								on:change={handleChange}
							/>{header.label}
							<span class="checkmark" />
						</label>
					{/if}
				{/each}
			</div>
		{/if}

		{#if searchIsShown}
			<div class="search-menu">
				<Input
					label={'施設名'}
					inputSize={'input--lg'}
					name={'name-search'}
					bind:value={searchInput.text}
				/>

				<div class="container">
					<Select label={'商談開始月'} options={years} unit={'年'} bind:value={searchInput.year} />
					<Select options={months} unit={'月'} bind:value={searchInput.month} />
				</div>
			</div>
		{/if}
	</header>

	<div class="section__main">
		<div class="table-wrapper">
			<table class="table">
				<thead>
					<tr>
						{#each tableHeaders as header}
							{#if dataIsShown[header.id]}
								<th class="theader">{header.label}</th>
							{/if}
						{/each}
						<th class="theader" />
					</tr>
				</thead>

				<tbody class="tbody">
					{#each filteredNegociations as negociation, index}
						<tr class="trow">
							{#each tableHeaders as header}
								{#if dataIsShown[header.id]}
									<td
										class="tdata {header.id} {header.id === 'condition'
											? header.id + '--' + negociation[header.id]
											: ''}"
									>
										{#if header.id === 'customerName'}
											<a href={'/negotiations/' + negociation.negociationId}>
												{negociation[header.id]}
											</a>
										{:else if header.id === 'billingAddress'}
											{'〒' +
												negociation.postalCode +
												negociation.prefecture +
												negociation.city +
												negociation.address1 +
												negociation.address2}
										{:else if header.id === 'memo'}
											{negociation.memo[negociation.memo.length - 1].memo}
										{:else}
											{negociation[header.id]}
										{/if}
									</td>
								{/if}
							{/each}
							<td class="tdata icon">
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore missing-declaration -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<span on:click={() => openModal(negociation.negociationId)}>
									<Icon icon={{ path: 'delete', color: '#0093d0' }} />
								</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</section>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap');
	.section {
		font-family: 'Noto Sans JP', sans-serif;
		color: var(--black);

		&__header {
			margin-bottom: 20px;
		}
	}

	button {
		margin: 0;
		&:first-child {
			margin-right: auto;
		}
	}

	.container {
		display: flex;
		justify-content: flex-end;
		gap: 18px;

		&.data-to-display {
			margin-top: 20px;
			flex-wrap: wrap;
			justify-content: flex-start;
			background-color: #fff;
			padding: 18px;
			border-radius: 18px;
		}
	}

	.table-wrapper {
		height: calc((558 / 768) * 100vh);
		overflow-y: scroll;

		&::-webkit-scrollbar {
			background-color: transparent;
			width: 10px;
		}

		&::-webkit-scrollbar-track {
			background-color: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background-color: var(--primary);
			border-radius: 16px;
		}
	}

	.table {
		width: max-content;
		border-collapse: collapse;

		.tbody {
			background-color: #fff;
		}

		.theader {
			position: sticky;
			top: 0;
			height: 42px;
			font-weight: bold;
			font-family: 'Noto Sans JP';
			background-color: var(--back);
			color: var(--primary);
		}

		.trow {
			border-bottom: 1px solid var(--primary);

			&:last-child {
				border: none;
			}
		}

		.tdata {
			padding: 11px 22px;
			width: fit-content;
			text-align: center;
			&.customerName {
				max-width: 200px;
			}

			&.condition {
				font-weight: 900;
				&--A {
					color: var(--error);
				}

				&--B {
					color: var(--primary);
				}
			}
		}

		.tdata:nth-child(2n) {
			background-color: rgb(244, 244, 244);
		}
	}

	.checkbox {
		margin-right: 11px;
	}

	.search-menu {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 20px;
		padding: 16px 12px;
		gap: 24px;
		background-color: rgb(196, 227, 247);
		background-color: #fff;
		border-radius: 16px;

		.container {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			gap: 18px;

			.label {
				font-size: 18px;
				font-weight: 400;
			}
		}
	}

	.btn {
		height: fit-content;
		width: fit-content;
	}

	// .btn ~ .icon {
	// 	span {
	// 		cursor: pointer;

	// 		&:hover {
	// 			opacity: 0.5;
	// 		}
	// 	}

	// 	> :global(.svg-icon) {
	// 		height: 18px * 1.2;
	// 	}
	// }

	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 64px;

		span {
			cursor: pointer;

			&:hover {
				opacity: 0.5;
			}

			> :global(.svg-icon) {
				height: 18px * 1.2;
			}
		}
	}
	// }

	.checkbox-container {
		position: relative;
		display: flex;
		justify-content: flex-end;
		flex-direction: row-reverse;
		align-items: center;
		width: 160px;
		margin-bottom: 12px;
		gap: 18px;
		font-size: 18px;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;

		& :hover {
			.checkbox ~ .checkmark {
				background-color: #ccc;
			}
		}

		& :after {
			content: '';
			display: none;
		}

		.checkmark {
			display: flex;
			align-items: center;
			justify-content: center;
			top: 0;
			left: 0;
			height: 20px;
			width: 20px;
			border: 1px solid var(--black);
			border-radius: 3px;

			&:after {
				width: 3px;
				height: 8px;
				border: solid white;
				border-width: 0 3px 3px 0;
				-webkit-transform: rotate(45deg);
				-ms-transform: rotate(45deg);
				transform: rotate(45deg);
			}
		}

		.checkbox {
			position: absolute;
			height: 0;
			width: 0;
			opacity: 0;
			cursor: pointer;

			&:checked ~ .checkmark {
				background-color: var(--primary);

				&:after {
					display: block;
				}
			}
		}
	}
</style>
