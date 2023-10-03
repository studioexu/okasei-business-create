<script lang="ts">
	export let info1: any[] = []
	export let info2: any[] = []
	export let address: any[] = []
	export let foundation: any[] = []
	export let date: any[] = []
</script>

<div class="section--confirmation">
	<div class="info1 container">
		{#each info1 as info}
			<div class="info-wrapper {info.class}">
				<h3 class="title">{info.title}</h3>
				<p class="data">{info.data}</p>
			</div>
		{/each}
	</div>

	<div class="address container">
		{#each address as info}
			<div class="info-wrapper {info.class}">
				<h3 class="title">{info.title}</h3>
				<p class="data">{info.data}</p>
			</div>
		{/each}
	</div>

	<div class="foundation container">
		<!-- {#each foundation as info}
        <div class="info-wrapper {info.class}">
            <h3 class="title">{info.title}</h3>
            <p class="data">{info.data}</p>
        </div>
    {/each} -->

		<div class="info-wrapper date">
			<h3 class="title">設立年月日</h3>
			<p class="data">{foundation[0].data}</p>
			<span class="unit">{foundation[0].title}</span>
			<p class="data">{foundation[1].data}</p>
			<span class="unit">{foundation[1].title}</span>
		</div>

		<div class="info-wrapper founder">
			<h3 class="title">{foundation[2].title}</h3>
			<p class="data">{foundation[2].data}</p>
		</div>
	</div>

	<div class="info2 container">
		{#each info2 as info}
			<div class="info-wrapper {info.class}">
				<h3 class="title">{info.title}</h3>
				<p class="data">{info.data}</p>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.section--confirmation {
		padding: 0 37px;
		padding-top: 28px;
		padding-bottom: 48px;
		background-color: #fff;
		width: calc(((1240 - 74) / 1366) * 100vw);
		width: calc(((1240 - 74) / 1366) * 100vw);
		width: auto;

		box-shadow: 0px 8px 8px rgb(200, 200, 200);
	}

	.container {
		overflow: hidden;
	}

	.section--confirmation {
		.title {
			color: #707070;
			color: rgb(206, 205, 205);
			font-size: 18px;
			font-weight: 500;
			width: auto;
		}

		.info-wrapper {
			position: relative;
			display: flex;
			padding: 11px 0;
			// .title {
			// 	width: 130px;
			// }
			column-gap: 18px;
			align-items: center;
			// border-bottom: 1px red solid;
			// gap: 130px;
		}

		.container {
			// .name,
			// .kana,
			// .postal,
			// .homepage,
			// .number-employees,
			// .facility-quantity {
			// 	width: 100%;
			// }

			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
			grid-template-rows: auto;
			// margin-bottom: 22px;
			gap: 0;
		}

		.info1 {
			grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
			grid-template-rows: auto;

			.info-wrapper {
				.title {
					width: 74px;
				}
				gap: calc((27 / 1366) * 100vw);
			}

			.customer-number {
				grid-column: 1 / span 2;
				grid-row: 1;
				&::after {
					content: ' ';
					position: absolute;
					width: calc(((1028) / 1366) * 100vw);
					left: 0;
					bottom: 0;
					height: 2px;
					background-color: rgb(206, 205, 205);
				}
			}

			.branch-number {
				grid-column: 3 / span 2;
				grid-row: 1;
			}

			.name,
			.kana {
				grid-column: 1 / span 12;
				&::after {
					content: ' ';
					position: absolute;
					width: calc(((1028) / 1366) * 100vw);
					left: 0;
					bottom: 0;
					height: 2px;
					background-color: rgb(206, 205, 205);
				}
			}

			.company-type {
				grid-column: 4 / span 3;
			}

			.institution-number {
				grid-column: 1 / span 3;
				.title {
					width: 130px;
				}
				&::after {
					content: ' ';
					position: absolute;
					width: calc(((1028) / 1366) * 100vw);
					left: 0;
					bottom: 0;
					height: 2px;
					background-color: rgb(206, 205, 205);
				}
			}
		}

		.address {
			.postal {
				grid-column: 1 / span 12;
				.title {
					width: 130px;
				}
				&::after {
					content: ' ';
					position: absolute;
					width: calc(((1028) / 1366) * 100vw);
					left: 0;
					bottom: 0;
					height: 2px;
					background-color: rgb(206, 205, 205);
				}
			}

			.region {
				grid-column: 1 / span 3;
				.title {
					width: 130px;
				}
				&::after {
					content: ' ';
					position: absolute;
					width: calc(((1028) / 1366) * 100vw);
					left: 0;
					bottom: 0;
					height: 2px;
					background-color: rgb(206, 205, 205);
				}
			}

			.city {
				grid-column: 4 / span 3;
			}

			.address1 {
				grid-column: 7 / span 3;
			}

			.address2 {
				grid-column: 10 / span 3;
			}

			.phone {
				grid-column: 1 / span 3;
				.title {
					width: 130px;
				}
				&::after {
					content: ' ';
					position: absolute;
					width: calc(((1028) / 1366) * 100vw);
					left: 0;
					bottom: 0;
					height: 2px;
					background-color: rgb(206, 205, 205);
				}
			}

			.fax {
				grid-column: 4 / span 3;
			}
		}

		.foundation {
			.info-wrapper {
				.title {
					width: 130px;
				}
			}
			// .year {
			// 	grid-column: 2 / span 1;
			// }
			// .month {
			// 	grid-column: 3 / span 1;
			// }
			.date {
				grid-column: 1 / span 3;
				&::after {
					content: ' ';
					position: absolute;
					width: calc(((1028) / 1366) * 100vw);
					left: 0;
					bottom: 0;
					height: 2px;
					background-color: rgb(206, 205, 205);
				}
			}
			.founder {
				grid-column: 4 / span 3;
			}
		}

		.info2 {
			.number-employee,
			.homepage,
			.facility-quantity {
				grid-column: 1 / span 12;
				.title {
					width: 130px;
				}
				&::after {
					content: ' ';
					position: absolute;
					width: calc(((1028) / 1366) * 100vw);
					left: 0;
					bottom: 0;
					height: 2px;
					background-color: rgb(206, 205, 205);
				}
			}
		}
	}
</style>
