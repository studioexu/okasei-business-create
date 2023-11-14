<script lang="ts">
	import Icon from '@/components/Icon.svelte'
	import Checkbox from '../../Components/Checkbox.svelte'
	import Wrapper from './components/Wrapper.svelte'
	import Layout from '@/routes/+layout.svelte'

	export let initialState2: any
</script>

<div class="negociation-info-confirmation">
	<div class="form-row">
		<Wrapper label={'ステータス'} content={initialState2.status} />
	</div>

	<div class="form-row">
		<Wrapper label={'商談開始日'} content={initialState2.startingDate} />
	</div>

	<div class="form-row">
		<Wrapper label={'可能性'} content={initialState2.condition} />
		<Wrapper label={'流入'} content={initialState2.inflow} />
	</div>

	<div class="form-row">
		<Wrapper label={'相見積'} content={initialState2.preference} />
	</div>
	<div class="form-row">
		<Wrapper label={'納期'} content={initialState2.billingDate} />
	</div>
	<div class="form-row">
		<Wrapper label={'入金予定'} content={initialState2.scheduledDeposit} />
	</div>
	<div class="form-row">
		<Wrapper label={'支払い方法'} content={initialState2.paymentMethod} />
	</div>
	<div class="form-row">
		<Wrapper label={'成否日'} content={initialState2.outcome} />
	</div>
	<div class="form-row">
		<Wrapper label={'次回連絡日時'} content={initialState2.nextContact} />
	</div>
	<div class="form-row">
		<Wrapper label={'最終連絡'} content={initialState2.lastContact} />
	</div>
	<div class="form-row">
		<Wrapper label={'納品先'} content={initialState2.postalCode} />
	</div>

	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'距離'}</h3>
			<p class="content">{initialState2.distanceKm}</p>
			<span>Km</span>
			<p class="content">{initialState2.distanceTime}</p>
			<span>時間</span>
		</div>
	</div>

	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">見積もり金額</h3>
			<div class="container">
				{#each initialState2.estimate as estimate, index}
					<div class="data-container">
						<div class="form-row">
							<Wrapper label={'発行日'} content={estimate.issueDate} />
							<Wrapper label={'見積期日'} content={estimate.dueDate} />
						</div>
						<div class="form-row">
							<Wrapper label={'税抜価格'} content={estimate.estimateWithoutTax} />
							<Wrapper label={'消費税'} content={estimate.tax} />
						</div>

						{#each estimate.products as product}
							<div class="form-row">
								<Wrapper label={'商品'} content={product.productName} />
								<Wrapper content={product.quantity} />
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
				{#each initialState2.importantMemo as memo}
					<Wrapper label={memo.date} content={memo.memo} />
				{/each}
			</div>
		</div>
	</div>
	<div class="form-row">
		<Wrapper label={'自社担当者'} content={initialState2.employeeInCharge} />
	</div>
	<div class="form-row">
		<Wrapper label={'責任者'} content={initialState2.responsiblePerson} />
	</div>
	<div class="form-row">
		<Wrapper label={'オカセイ便り'} content={initialState2.communication} />
		<Wrapper label={'DM発送'} content={initialState2.directMessage} />
		<Wrapper label={'PR動画'} content={initialState2.videoUrl} />
	</div>

	<!-- chekboxes -->
	{#each initialState2.checkboxes as checkbox}
		<div class="form-row">
			<div class="wrapper">
				<div class="checkbox-wrapper">
					{#if !checkbox.isChecked}
						<Icon icon={{ path: 'checkbox-empty', color: 'rgb(200, 200, 200)' }} />
					{:else}
						<Icon icon={{ path: 'checkbox-checked', color: 'rgb(200, 200, 200)' }} />
					{/if}
				</div>

				<p class="content">{checkbox.title}</p>
			</div>
		</div>
	{/each}
	<!-- </div> -->

	<div class="form-row">
		<Wrapper label={'ボトルネック確認'} content={initialState2.checkBottleneck} />
	</div>

	<div class="form-row">
		<Wrapper label={'機会（チャンス）'} content={initialState2.occasion} />
	</div>

	<div class="form-row">
		<Wrapper label={'脅威（リスク）'} content={initialState2.risk} />
	</div>

	<div class="form-row">
		<h3 class="label">商談経緯</h3>
		<div class="container">
			{#each initialState2.outcomeHistory as outcome}
				<Wrapper label={outcome.date} content={outcome.memo} />
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		position: relative;
		border-radius: 8px;
		width: 100%;

		.form-row {
			justify-content: space-between;
		}
	}

	.form-row {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		margin-bottom: 20px;
		gap: 12px;
		border-bottom: 1px solid #f4f4f4;
		padding-bottom: 20px;
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

	.image-wrapper {
		position: relative;
		width: 180px;
		height: 133px;

		img {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			object-fit: contain;
		}
	}

	.data-container {
		width: calc((531 / 1366) * 100vw);
		// max-width: 531px;
		margin-bottom: 18px;
		background-color: aqua;

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
</style>
