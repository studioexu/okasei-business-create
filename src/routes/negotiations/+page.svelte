<script lang="ts" context="module"></script>

<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements'
	import DeleteModal from '@/views/modals/DeleteModal.svelte'
	import Input from '@/components/Input.svelte'
	import Icon from '@/components/Icon.svelte'
	import SelectDate from '@/components/SelectDate.svelte'
	import { negotiation, negotiations } from '@/stores/negotiations'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import InputCheckbox from '@/components/InputCheckbox.svelte'
	import { NegotiationFactory } from '@/Factories/NegotiationFactory'

	let searchIsShown = false
	let displayMenuIsShown = false

	const allnegotiations: NegotiationFactory[] = $negotiations.map(
		negotiation => new NegotiationFactory(negotiation, 'local')
	)
	let filterednegotiations = allnegotiations

	const tableHeaders: { label: string; id: keyof NegotiationDataIsShown }[] = [
		{ label: '施設名', id: 'customerName' },
		{ label: 'ステータス', id: 'status' },
		{ label: '商談開始日', id: 'startingDate' },
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

	const headerButtons: { text: string; action: MouseEventHandler<HTMLButtonElement> }[] = [
		{ text: '＋新規追加', action: () => (window.location.href = '/negotiations/new') },
		{ text: '表示・非表示', action: () => (displayMenuIsShown = !displayMenuIsShown) },
		{ text: '絞り込み検索', action: () => (searchIsShown = !searchIsShown) }
	]

	// SEARCH FEATURE

	const years: string[] = ['']
	const months: string[] = ['']
	const currentYear = new Date().getFullYear() + 1
	const minYear = 2000

	for (let i = minYear; i <= currentYear; i++) {
		years.push(i.toString())
	}

	for (let i = 1; i <= 12; i++) {
		months.push(i.toString())
	}

	$: searchInput = {
		name: '',
		year: '',
		month: ''
	}

	/**
	 * The function filters the data when the user enters new input
	 * @param searchInput: Object composed of the name, year and month
	 * @returns new array with the filtered negotiations
	 */
	const handleSearch = (searchInput: {
		name: string
		year: string
		month: string
	}): NegotiationFactory[] => {
		let filtered = allnegotiations

		Object.keys(searchInput).map(key => {
			if (searchInput[key as keyof { name: string; year: string; month: string }] !== '') {
				filtered = filtered.filter(negotiation => {
					if (key === 'name') {
						return negotiation.customerName.includes(searchInput.name)
					} else {
						let date
						if (key === 'month') date = new Date(negotiation.startingDate).getMonth() + 1
						if (key === 'year') date = new Date(negotiation.startingDate).getFullYear()

						return (
							date ===
							parseInt(searchInput[key as keyof { name: string; year: string; month: string }])
						)
					}
				})
			}
		})
		return filtered
	}

	$: filterednegotiations = handleSearch(searchInput)

	//NEGOTIATION DATA TO DISPLAY

	interface NegotiationDataIsShown {
		negotiationId: boolean
		custCd: boolean
		customerName: boolean
		status: boolean
		startingDate: boolean
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

	const negotiationDataIsShown: NegotiationDataIsShown = {
		customerName: true,
		status: true,
		startingDate: true,
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
		negotiationId: false,
		custCd: false
	}

	/**
	 * It is Called when the user check/uncheck the column to display.
	 * It will save the settings in the localStorage.
	 *
	 */
	const handleChange = (): void => {
		localStorage.setItem('negotiation-table-column-to-show', JSON.stringify(negotiationDataIsShown))
	}

	/**
	 * get the file on the local storage and update the object of the columns to display.
	 * If there isn't any data in the local storage, it will do nothing.
	 */
	const setColumnToDisplay = (): void => {
		const setColumnToDisplay = localStorage.getItem('negotiation-table-column-to-show')

		if (setColumnToDisplay) {
			const columns: NegotiationDataIsShown = JSON.parse(setColumnToDisplay)
			for (const key in columns) {
				negotiationDataIsShown[key as keyof NegotiationDataIsShown] =
					columns[key as keyof NegotiationDataIsShown]
			}
		}
	}

	onMount(() => {
		setColumnToDisplay()
	})

	// DELETE MODAL

	let phase: 'shown' | 'success' | 'error' = 'shown'
	let currentUser: number
	let deleteModalIsShown = false

	/**
	 * The function opens the delete modal and pass the index.
	 * @param index: index of the element to delete
	 */
	const openModal = (index: number): void => {
		currentUser = index
		deleteModalIsShown = true
	}

	$: console.log(filterednegotiations)

	/**
	 * On click on the delete modal.
	 * @param event
	 */
	const onClick = (event: { detail: { key: string } }): void => {
		switch (event.detail.key) {
			case 'cancel':
				deleteModalIsShown = false
				break

			case 'delete':
				try {
					negotiations.set(
						$negotiations.filter(negotiation => negotiation.negotiationId !== currentUser)
					)

					if ($negotiation.negotiationId === currentUser) {
						negotiation.set({
							customerName: '',
							status: '',
							startingDate: '',
							condition: '',
							inflow: '',
							billingDate: '',
							scheduledDeposit: '',
							outcome: '',
							nextContactDate: '',
							nextContactTime: '',
							lastContact: '',
							postalCode: '',
							prefecture: '',
							city: '',
							address1: '',
							address2: '',
							numberOfBeds: 0,
							estimate: [],
							personInCharge: '',
							responsiblePerson: '',
							memo: [],
							dm: '',
							video: '',
							negotiationId: 0,
							custCd: 0,
							checkboxes: [],
							bottleneck: '',
							occasion: '',
							risk: '',
							outcomeHistory: [],
							communication: '',
							distanceKm: 0,
							distanceTime: 0,
							preference: '',
							contact: '',
							billingEstimation: 0
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
			{#each headerButtons as button}
				<button type="button" class="primary" on:click={button.action}>
					{button.text}
				</button>
			{/each}
		</div>

		{#if displayMenuIsShown}
			<div class="container data-to-display">
				{#each tableHeaders as header}
					{#if header.id !== 'customerName'}
						<InputCheckbox
							name={header.id}
							label={header.label}
							bind:isChecked={negotiationDataIsShown[header.id]}
							on:checked={handleChange}
						/>
					{/if}
				{/each}
			</div>
		{/if}

		{#if searchIsShown}
			<div class="search-menu" on:input={() => handleSearch(searchInput)}>
				<Input
					label={'施設名'}
					inputSize={'input--lg'}
					name={'name-search'}
					bind:value={searchInput.name}
				/>

				<div class="container">
					<SelectDate
						name={'search-year'}
						label={'年'}
						options={years}
						bind:value={searchInput.year}
					/>
					<SelectDate
						name={'search-month'}
						label={'月'}
						options={months}
						bind:value={searchInput.month}
					/>
				</div>
			</div>
		{/if}
	</header>

	<div class="section__main">
		{#if filterednegotiations.length === 0}
			<h2 class="no-data-message">データがありません。</h2>
		{:else}
			<div class="table-wrapper">
				<table class="table">
					<thead>
						<tr>
							{#each tableHeaders as header}
								{#if negotiationDataIsShown[header.id]}
									<th class="theader">{header.label}</th>
								{/if}
							{/each}
							<th class="theader" />
						</tr>
					</thead>

					<tbody class="tbody">
						{#each filterednegotiations as negotiation, index}
							<tr class="trow">
								{#each tableHeaders as header}
									{#if negotiationDataIsShown[header.id]}
										<td
											class="tdata {header.id} {header.id === 'condition' &&
												header.id + '--' + negotiation[header.id]}"
										>
											{#if header.id === 'customerName'}
												<a href={'/negotiations/' + negotiation.negotiationId}>
													{negotiation[header.id]}
												</a>
											{:else if header.id === 'billingAddress'}
												{'〒' +
													negotiation.postalCode +
													negotiation.prefecture +
													negotiation.city +
													negotiation.address1 +
													negotiation.address2}
											{:else if header.id === 'memo'}
												{negotiation.memo[negotiation.memo.length - 1].memo}
											{:else if header.id === 'numberOfBeds'}
												{negotiation.minMaxBed.min === negotiation.minMaxBed.max
													? negotiation.minMaxBed.min + '台'
													: negotiation.minMaxBed.min + '台 - ' + negotiation.minMaxBed.max + '台'}
											{:else if header.id === 'billingEstimation'}
												{negotiation.minMaxEstimate.min === negotiation.minMaxEstimate.max
													? negotiation.minMaxEstimate.min + '円'
													: negotiation.minMaxEstimate.min +
													  '円 - ' +
													  negotiation.minMaxEstimate.max +
													  '円'}
											{:else if header.id === 'nextContact'}
												{negotiation.nextContactDate !== '' ? negotiation.nextContactDate : 'ー'}
												{negotiation.nextContactTime !== '' ? negotiation.nextContactTime : 'ー'}
											{:else if header.id === 'outcome' || header.id === 'billingDate'}
												{negotiation[header.id] !== '' ? negotiation[header.id] : '未定'}
											{:else}
												{negotiation[header.id]}
											{/if}
										</td>
									{/if}
								{/each}
								<td class="tdata icon">
									<button
										class="delete"
										type="button"
										on:click={() => openModal(negotiation.negotiationId)}
									>
										<Icon icon={{ path: 'delete', color: '#0093d0' }} />
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</section>

<style lang="scss">
	.section {
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

	.search-menu {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 20px;
		padding: 16px 12px;
		gap: 24px;
		background-color: #fff;
		border-radius: 16px;

		.container {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			gap: 18px;
		}
	}

	.btn {
		height: fit-content;
		width: fit-content;
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
		background-color: #fff;

		.theader {
			position: sticky;
			top: 0;
			height: 42px;
			font-weight: bold;
			color: var(--primary);
			background-color: var(--back);
		}

		.trow {
			height: fit-content;
			border-bottom: 1px solid var(--gray);

			&:last-child {
				border: none;
			}
		}

		.tdata {
			width: fit-content;
			padding: 11px 22px;
			text-align: center;
			&.customerName {
				max-width: 200px;

				a {
					color: var(--primary);

					&:hover {
						opacity: 0.5;
					}
				}
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

			&:nth-child(2n) {
				background-color: rgb(244, 244, 244);
			}
		}
	}

	.icon {
		button {
			cursor: pointer;
			background-color: transparent;
			margin: auto;

			&:hover {
				opacity: 0.5;
			}

			> :global(.svg-icon) {
				height: 18px * 1.2;
			}
		}
	}
</style>
