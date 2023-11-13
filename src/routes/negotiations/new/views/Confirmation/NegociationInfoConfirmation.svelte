<script lang="ts">
	export let initialState2: any
</script>

<div class="negociation-info-confirmation">
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'status'}</h3>
			<p class="content">{initialState2.status}</p>
		</div>
	</div>

	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'商談開始日'}</h3>
			<p class="content">{initialState2.startingDate}</p>
		</div>
	</div>

	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'可能性'}</h3>
			<p class="content">{initialState2.condition}</p>
		</div>
		<div class="wrapper">
			<h3 class="label">{'流入'}</h3>
			<p class="content">{initialState2.inflow}</p>
		</div>
	</div>

	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'相見積'}</h3>
			<p class="content">{initialState2.preference}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'納期'}</h3>
			<p class="content">{initialState2.billingDate}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'入金予定'}</h3>
			<p class="content">{initialState2.scheduledDeposit}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'支払い方法'}</h3>
			<p class="content">{initialState2.paymentMethod}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'成否日'}</h3>
			<p class="content">{initialState2.outcome}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'次回連絡日時'}</h3>
			<p class="content">{initialState2.nextContact}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'最終連絡'}</h3>
			<p class="content">{initialState2.lastContact}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'納品先'}</h3>
			<p class="content">{initialState2.postalCode}</p>
		</div>
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
					<div class="container">
						<div class="form-row">
							<p>{estimate.issueDate}</p>
						</div>
						<div class="form-row">
							<p>{estimate.dueDate}</p>
						</div>
						<div class="form-row">
							<p>{estimate.estimateWithoutTax}</p>
							<p>{estimate.tax}</p>
						</div>

						{#each estimate.products as product}
							<div class="form-row">
								<p>{product.productName}</p>
								<p>{product.quantity}</p>
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
			<p class="content">{initialState2.importantMemo}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'自社担当者'}</h3>
			<p class="content">{initialState2.employeeInCharge}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'責任者'}</h3>
			<p class="content">{initialState2.responsiblePerson}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'オカセイ便り'}</h3>
			<p class="content">{initialState2.communication}</p>
		</div>
		<div class="wrapper">
			<h3 class="label">{'DM発送'}</h3>
			<p class="content">{initialState2.directMessage}</p>
		</div>
		<div class="wrapper">
			<h3 class="label">{'PR動画'}</h3>
			<p class="content">{initialState2.videoUrl}</p>
		</div>
	</div>

	<div class="form-row">
		<!-- chekboxes -->
	</div>

	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'ボトルネック確認'}</h3>
			<p class="content">{initialState2.bottleneck}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'機会（チャンス）'}</h3>
			<p class="content">{initialState2.occasion}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{'脅威（リスク）'}</h3>
			<p class="content">{initialState2.risk}</p>
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		position: relative;
		background-color: #f4f4f4;
		padding: 10px 21px;
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
	}

	.wrapper {
		display: flex;
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
</style>
