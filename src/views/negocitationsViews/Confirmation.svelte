<script lang="ts">
	import Icon from '@/components/Icon.svelte'
	import Wrapper from '@/components/DetailWrapper.svelte'

	export let initialState: any
</script>

<div class="negociation-confirmation">
	<div class="form-row">
		<Wrapper label={'ステータス'} content={initialState.status} />
	</div>

	<div class="form-row">
		<Wrapper label={'商談開始日'} content={initialState.startingDate} />
	</div>

	<div class="form-row">
		<Wrapper label={'可能性'} content={initialState.condition} />
		<Wrapper label={'流入'} content={initialState.inflow} />
	</div>

	<div class="form-row">
		<Wrapper label={'相見積'} content={initialState.preference} />
	</div>
	<div class="form-row">
		<Wrapper label={'納期'} content={initialState.billingDate} />
	</div>
	<div class="form-row">
		<Wrapper label={'入金予定'} content={initialState.scheduledDeposit} />
	</div>
	<div class="form-row">
		<Wrapper label={'支払い方法'} content={initialState.paymentMethod} />
	</div>
	<div class="form-row">
		<Wrapper label={'成否日'} content={initialState.outcome} />
	</div>
	<div class="form-row">
		<Wrapper
			label={'次回連絡日時'}
			content={initialState.nextContactDate + ' ' + initialState.nextContactTime}
		/>
	</div>
	<div class="form-row">
		<Wrapper label={'最終連絡'} content={initialState.lastContact} />
	</div>
	<div class="form-row">
		<Wrapper label={'納品先'} content={initialState.postalCode} />
	</div>
	<div class="form-row">
		<Wrapper label={'都道府県'} content={initialState.prefecture} />
		<Wrapper label={'市区町村'} content={initialState.city} />
	</div>
	<div class="form-row">
		<Wrapper label={'住所1'} content={initialState.address1} />
		<Wrapper label={'住所2'} content={initialState.address2} />
	</div>

	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'距離'}</h3>
			<p class="content">{initialState.distanceKm}</p>
			<span>Km</span>
			<p class="content">{initialState.distanceTime}</p>
			<span>時間</span>
		</div>
	</div>

	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">見積もり金額</h3>
			<div class="container">
				{#each initialState.estimate as estimate, index}
					<div class="data-container">
						<div class="form-row">
							<Wrapper label={'発行日'} content={estimate.issueDate} />
							<Wrapper label={'見積期日'} content={estimate.dueDate} />
						</div>
						<div class="form-row">
							<Wrapper label={'税抜価格'} content={estimate.estimateWithoutTax} />
							<Wrapper label={'消費税'} content={estimate.tax} />
						</div>

						{#each estimate.items as item}
							<div class="form-row">
								<Wrapper label={'商品'} content={item.name} />
								<Wrapper content={item.quantity} />
							</div>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'重要メモ'}</h3>
			<div class="container">
				{#each initialState.memo as memo}
					<div class="form-row">
						<Wrapper label={memo.date} content={memo.memo} />
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="form-row">
		<Wrapper label={'自社担当者'} content={initialState.employeeInCharge} />
	</div>
	<div class="form-row">
		<Wrapper label={'責任者'} content={initialState.responsiblePerson} />
	</div>
	<div class="form-row">
		<Wrapper label={'オカセイ便り'} content={initialState.communication} />
		<Wrapper label={'DM発送'} content={initialState.directMessage} />
		<Wrapper label={'PR動画'} content={initialState.videoUrl} />
	</div>

	<div class="form-row">
		<div class="container">
			{#each initialState.checkboxes as checkbox}
				<div class="wrapper">
					<div class="checkbox-wrapper">
						{#if !checkbox.isChecked}
							<Icon icon={{ path: 'checkbox-empty', color: 'var(--gray)' }} />
						{:else}
							<Icon icon={{ path: 'checkbox-checked', color: 'var(--gray)' }} />
						{/if}
					</div>

					<p class="content">{checkbox.title}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="form-row">
		<Wrapper label={'ボトルネック確認'} content={initialState.checkBottleneck} />
	</div>

	<div class="form-row">
		<Wrapper label={'機会（チャンス）'} content={initialState.occasion} />
	</div>

	<div class="form-row">
		<Wrapper label={'脅威（リスク）'} content={initialState.risk} />
	</div>

	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">商談経緯</h3>
			<div class="container">
				{#each initialState.outcomeHistory as outcome}
					<div class="form-row">
						<Wrapper label={outcome.date} content={outcome.memo} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		gap: 12px;
		position: relative;
		border-radius: 8px;
		.form-row {
			justify-content: space-between;
		}
	}

	.form-row {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 50px;
		border-bottom: 1px solid rgb(206, 205, 205);

		&:last-child {
			border: none;
		}
	}

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

	.data-container {
		width: calc((600 / 1366) * 100vw);
		min-width: 520px;
		padding: 18px 20px;
		// max-width: 531px;
		margin-bottom: 18px;
		background-color: #f4f4f4;
		border-radius: 8px;

		.form-row {
			margin: 0;
			padding: 0;
			border-bottom: none;
			.wrapper {
				// &:first-child {
				.label {
					width: 90px;
				}
				// }
			}
		}
	}

	.checkbox-wrapper {
		display: flex;
		align-items: center;
		> :global(.svg-icon) {
			height: 18px * 1.5;
		}
	}

	.wrapper {
		position: relative;
		display: flex;
		padding: 11px 0;
		column-gap: 18px;
		align-items: center;

		.label {
			color: var(--gray);
			font-size: 18px;
			font-weight: 500;
			width: auto;
		}

		&:first-child {
			.label {
				width: 130px;
			}
		}
	}
</style>
