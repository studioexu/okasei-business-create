<script lang="ts" context="module">
	import { debounce } from '@/libs/utils'

	const jpDateStr = new Intl.DateTimeFormat('ja-JP').format(new Date())
	const convertDate = (date: string): Date => new Date(date.replaceAll('/', '-'))
	const jpDate = convertDate(jpDateStr)
	const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土']

	// It will be used in calling API
	const yesterday = jpDate.setDate(jpDate.getDate() - 1)
	const lastWeekDay = jpDate.setDate(jpDate.getDate() - 7)

	const dailyRatio: ('units' | 'revenue')[] = ['units', 'revenue']
	const labels = { units: '台数', revenue: '金額' }
	const units = { units: '台', revenue: '円' }

	const addNumbers = (numbers: number[]): number => numbers.reduce((prev, curr) => prev + curr, 0)
	const convertPrice = (number: number, ratio: 'units' | 'revenue'): string | number =>
		ratio === 'revenue' ? number.toLocaleString('ja-JP') : number

	const calculateRatio = (today: number[], past: number[]): number =>
		Math.round((100 + ((addNumbers(today) - addNumbers(past)) / addNumbers(today)) * 100) * 10) / 10
</script>

<script lang="ts">
	let isReadonly = true
	let monthlyTarget = '100,000,000'

	const todayData: { units: number[]; revenue: number[] } = {
		units: [17, 5],
		revenue: [1600000, 400000]
	}

	const yesterdayData: { units: number[]; revenue: number[] } = {
		units: [18, 2],
		revenue: [1700000, 100000]
	}
	const lastWeekDayData: { units: number[]; revenue: number[] } = {
		units: [16, 9],
		revenue: [1600000, 700000]
	}

	const onFocus = () => {
		monthlyTarget = monthlyTarget.replaceAll(',', '')
		isReadonly = !isReadonly
	}

	const onInput = debounce((event: Event) => {
		const value = (<HTMLInputElement>event.target).value

		if (!value.includes('e') && parseInt(value, 10) > 0) monthlyTarget = value
	}, 200)

	const onBlur = () => {
		monthlyTarget = parseInt(monthlyTarget, 10).toLocaleString('ja-JP')
		isReadonly = !isReadonly
	}

	const addClassName = (ratio: 'units' | 'revenue', past: number[]): string => {
		const todayNum = addNumbers(todayData[ratio])
		const pastNum = addNumbers(past)

		return todayNum > pastNum ? 'increasing' : todayNum < pastNum ? 'decreasing' : ''
	}
</script>

<div class="sales">
	<div class="sales-header">
		<p class="font-large">{`${jpDateStr}（${daysOfWeek[jpDate.getDay()]}）`}</p>
		<p>
			今月の目標
			<input
				class:readonly={isReadonly}
				type={isReadonly ? 'text' : 'number'}
				value={monthlyTarget}
				readonly={isReadonly}
				on:focus={onFocus}
				on:input={event => onInput(event)}
				on:blur={onBlur}
			/>
			円
		</p>
	</div>
	{#each dailyRatio as ratio}
		<div class="graph">
			<div class="graph-label">
				<div class="left">
					<p>{labels[ratio]}</p>
					<p>{convertPrice(addNumbers(todayData[ratio]), ratio)}{units[ratio]}</p>
					<div>
						<p class={ratio}>
							<span>法人：</span>
							<span>{convertPrice(todayData[ratio][0], ratio)}{units[ratio]}</span>
						</p>
						<p class={ratio}>
							<span>個人：</span>
							<span>{convertPrice(todayData[ratio][1], ratio)}{units[ratio]}</span>
						</p>
					</div>
				</div>
				<div class="right">
					<p>
						<span>前日比：</span>
						<span class="font-large">
							<span class={addClassName(ratio, yesterdayData[ratio])}>
								{calculateRatio(todayData[ratio], yesterdayData[ratio])}
							</span>%
						</span>
					</p>
					<p>
						<span>前週同日比：</span>
						<span class="font-large">
							<span class={addClassName(ratio, lastWeekDayData[ratio])}>
								{calculateRatio(todayData[ratio], lastWeekDayData[ratio])}
							</span>%
						</span>
					</p>
				</div>
			</div>
			<div class="graph-container">b</div>
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

			> p:last-child {
				> input {
					padding: 8px 16px;
					margin-left: 16px;
					margin-right: 8px;
					text-align: right;
				}
			}
		}

		.graph {
			margin-top: 32px;

			&:first-of-type {
				margin-bottom: 64px;
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

								> span {
									display: block;
									font-weight: normal;
								}
							}
						}

						> div {
							p {
								text-align: center;

								span {
									color: #fff;

									&:last-child {
										display: inline-block;
										text-align: right;
									}
								}
							}

							.units span:last-child {
								width: 64px;
							}

							.revenue span:last-child {
								width: 112px;
							}
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
				background: blue;
				padding: 16px;
			}
		}
	}
</style>
