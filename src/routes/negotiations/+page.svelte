<script lang="ts" context="module"></script>

<script lang="ts">
	import type { Negociation } from '@/libs/negociationTypes'
	import type { MouseEventHandler } from 'svelte/elements'
	import DeleteModal from '@/views/modals/DeleteModal.svelte'
	import Input from '@/components/Input.svelte'
	import Icon from '@/components/Icon.svelte'
	import SelectDate from '@/components/SelectDate.svelte'
	import { negociation, negociations } from '@/stores/negociations'
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'

	let searchIsShown = false
	let displayMenuIsShown = false
	let filteredNegociations: Negociation[] = $negociations

	const tableHeaders: { label: string; id: keyof NegotiationDataIsShown }[] = [
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

	const headerButtons: { text: string; action: MouseEventHandler<HTMLButtonElement> }[] = [
		{ text: '＋新規追加', action: () => (window.location.href = '/negotiations/new') },
		{ text: '表示・非表示', action: () => (displayMenuIsShown = !displayMenuIsShown) },
		{ text: '絞り込み検索', action: () => (searchIsShown = !searchIsShown) }
	]

	// SEARCH NEGOTIATIONS

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

	let searchInput = {
		name: '',
		year: '',
		month: ''
	}

	$: searchInput

	/**
	 * The function filters the data when the user enters new input
	 * @param searchInput: Object composed of the name, year and month
	 * @returns new array with the filtered negotiations
	 */
	const handleSearch = (searchInput: {
		name: string
		year: string
		month: string
	}): Negociation[] => {
		let filtered = $negociations

		if (searchInput.name !== '') {
			filtered = filtered.filter(negociation => {
				if (negociation.customerName.includes(searchInput.name)) {
					return negociation
				}
			})
		}

		if (searchInput.year !== '') {
			filtered = filtered.filter(negociation => {
				if (new Date(negociation.firstTransaction).getFullYear() === parseInt(searchInput.year)) {
					return negociation
				}
			})
		}

		if (searchInput.month !== '') {
			filtered = filtered.filter(negociation => {
				if (new Date(negociation.firstTransaction).getMonth() + 1 === parseInt(searchInput.month)) {
					return negociation
				}
			})
		}

		return filtered
	}

	$: filteredNegociations = handleSearch(searchInput)

	//NEGOTIATION DATE TO DISPLAY

	interface NegotiationDataIsShown {
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

	const negotiationDataIsShown: NegotiationDataIsShown = {
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

	/**
	 * When the user checks or unchecks a checkbox, it will save the parameters in the local storage.
	 * @param e
	 */
	const handleChange = (e: any): void => {
		const id: keyof NegotiationDataIsShown = e.target.id
		negotiationDataIsShown[id] = e.target.checked
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
						<label class="checkbox-container" for={header.id}>
							<input
								class="checkbox"
								type="checkbox"
								name={header.id}
								id={header.id}
								bind:checked={negotiationDataIsShown[header.id]}
								on:change={handleChange}
							/>{header.label}
							<span class="checkmark" />
						</label>
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
					{#each filteredNegociations as negociation, index}
						<tr class="trow">
							{#each tableHeaders as header}
								{#if negotiationDataIsShown[header.id]}
									<td
										class="tdata {header.id} {header.id === 'condition' &&
											header.id + '--' + negociation[header.id]}"
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

	.checkbox {
		margin-right: 11px;
	}

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
