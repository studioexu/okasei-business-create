<script lang="ts" context="module">
	import { debounce, toNumber } from '@/libs/utils'

	type Item = 'amount' | 'revenue'
	interface Data {
		amounts: number[]
		revenues: number[]
	}

	const jpDateStr: string = new Intl.DateTimeFormat('ja-JP').format(new Date())
	const convertDate = (date: string): Date => new Date(date.replaceAll('/', '-'))
	const jpDate: Date = convertDate(jpDateStr)
	const daysOfWeek: string[] = ['日', '月', '火', '水', '木', '金', '土']

	// It will be used in calling API
	const yesterday = jpDate.setDate(jpDate.getDate() - 1)
	const lastWeekDay = jpDate.setDate(jpDate.getDate() - 7)

	const items: Item[] = ['amount', 'revenue']
	const labels: Record<Item, string> = { amount: '台数', revenue: '金額' }
	const units: Record<Item, string> = { amount: '台', revenue: '円' }

	const addNumbers = (numbers: number[]): number => numbers.reduce((prev, curr) => prev + curr, 0)

	const toJP = (arg: string | number): string =>
		(typeof arg === 'string' ? toNumber(arg) : arg).toLocaleString('ja-JP')

	const calculate = (today: number[], past: number[]): string => {
		const todayData: number = addNumbers(today)
		return (
			Math.round((100 + ((todayData - addNumbers(past)) / todayData) * 100) * 10) / 10
		).toFixed(1)
	}
</script>

<script lang="ts">
	let isEditables: Record<Item, boolean> = { amount: false, revenue: false }
	let monthlyTargets: Record<Item, number> = { amount: 50, revenue: 10000000 }

	const todayData: Data = {
		amounts: [17, 5],
		revenues: [3600000, 400000]
	}

	const yesterdayData: Data = {
		amounts: [18, 2],
		revenues: [1700000, 100000]
	}
	const lastWeekDayData: Data = {
		amounts: [16, 9],
		revenues: [1600000, 700000]
	}

	const comparisons: { label: string; data: Data }[] = [
		{ label: '前日比', data: yesterdayData },
		{ label: '前週同日比', data: lastWeekDayData }
	]

	const pastTotalData: Record<Item, number> = { amount: 2, revenue: 30000 }

	const onInput = debounce((event: Event, item: Item) => {
		const value = (<HTMLInputElement>event.target).value

		if (!value.includes('e') && toNumber(value) > 0) monthlyTargets[item] = toNumber(value)
	}, 200)

	const addClassName = (item: Item, past: number[]): string => {
		const todayNum = addNumbers(todayData[`${item}s`])
		const pastNum = addNumbers(past)

		return todayNum > pastNum ? 'increasing' : todayNum < pastNum ? 'decreasing' : ''
	}

	const getTotalData = (item: Item): number =>
		addNumbers([pastTotalData[item], ...todayData[`${item}s`]])
</script>

<div class="sales">
	<div class="sales-header">
		<p class="font-large">{`${jpDateStr}（${daysOfWeek[jpDate.getDay() + 1]}）`}</p>
		<p>
			{#each items as item}
				<span>
					今月の目標{labels[item]}
					<input
						type={isEditables[item] ? 'number' : 'text'}
						value={isEditables[item] ? monthlyTargets[item] : toJP(monthlyTargets[item]).trim()}
						readonly={!isEditables[item]}
						on:focus={() => (isEditables[item] = true)}
						on:input={event => onInput(event, item)}
						on:blur={() => (isEditables[item] = false)}
					/>
					{units[item]}
				</span>
			{/each}
		</p>
	</div>
	{#each items as item}
		<div class="graph">
			<div class="graph-label">
				<div class="left">
					<p>{labels[item]}</p>
					<p>{toJP(addNumbers(todayData[`${item}s`]))}{units[item]}</p>
					<div>
						{#each ['法人', '個人'] as individuality, index}
							<p class={item}>
								<span>{individuality}：</span>
								<span>{toJP(todayData[`${item}s`][index])}{units[item]}</span>
							</p>
						{/each}
					</div>
				</div>
				<div class="right">
					{#each comparisons as comparison}
						<p>
							<span>{comparison.label}：</span>
							<span class="font-large">
								<span class={addClassName(item, comparison.data[`${item}s`])}>
									{calculate(todayData[`${item}s`], comparison.data[`${item}s`])}
								</span>%
							</span>
						</p>
					{/each}
				</div>
			</div>
			<div class="graph-container">
				{#if getTotalData(item) < monthlyTargets[item]}
					{#each [monthlyTargets[item], getTotalData(item), pastTotalData[item]] as num}
						<span
							class="underachievement"
							style={`width: ${Math.round((num / monthlyTargets[item]) * 100)}%`}
						>
							<!-- {toJP(num)}{units[item]} -->
						</span>
					{/each}
				{:else}
					{#each [monthlyTargets[item], getTotalData(item), pastTotalData[item]] as num}
						<span
							class="achieved"
							style={`width: ${Math.round((num / monthlyTargets[item]) * 100)}%`}
						>
							{toJP(num)}{units[item]}
						</span>
					{/each}
				{/if}
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.sales {
		background: #fff;
		border-radius: 16px;
		padding: 32px;
		overflow-x: overlay;

		&-header,
		.graph {
			max-width: 960px;
			min-width: 800px;
			margin: 0 auto;
		}

		&-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 32px;

			p:last-child span {
				&:first-child {
					margin-right: 16px;

					input {
						width: 80px;
					}
				}

				&:last-child input {
					width: 144px;
				}

				input {
					padding: 8px 16px;
					margin-left: 8px;
					text-align: right;
				}
			}
		}

		.graph {
			&:last-child {
				margin-top: 64px;
			}

			&-label {
				display: flex;
				align-items: center;

				> div {
					display: inline-block;

					&.left {
						width: 320px;
						background: var(--primary);
						padding: 16px;
						margin-right: 32px;

						> p {
							color: #fff;
							font-weight: bold;

							&:first-child {
								font-size: 21px;
							}

							&:nth-child(2) {
								font-size: 30px;
								margin-bottom: 16px;
								text-align: center;
							}
						}

						> div p {
							text-align: center;

							&:first-child {
								margin-bottom: 8px;
							}

							span {
								color: #fff;

								&:last-child {
									display: inline-block;
									text-align: right;
								}
							}
						}

						.amount span:last-child {
							width: 64px;
						}

						.revenue span:last-child {
							width: 112px;
						}
					}

					&.right > p {
						display: flex;
						align-items: center;
						justify-content: space-between;

						&:first-child {
							margin-bottom: 8px;
						}

						.font-large {
							margin-left: 8px;

							> span {
								font-size: 24px;

								&.increasing {
									color: var(--primary);
								}

								&.decreasing {
									color: var(--error);
								}
							}
						}
					}
				}
			}

			&-container {
				width: 100%;
				margin-top: 32px;

				span {
					--height: calc(18px * 1.5 + 32px);
					display: flex;
					justify-content: end;
					height: var(--height);
					padding: 16px;
					margin: 0;
					border-radius: 0 16px 16px 0;

					&.underachievement {
						&:first-child {
							background: var(--back);
						}

						&:nth-child(2) {
							background: var(--primary);
							color: #fff;
							margin-top: calc(-1 * var(--height));
						}

						&:last-child {
							background: #ccc;
							margin-top: calc(-1 * var(--height));
						}
					}
				}
			}
		}
	}
</style>
