<script lang="ts">
	let years: string[] = []
	const minYear = 1500
	const currentYear = new Date().getFullYear()
	for (let i = 1850; i < currentYear; i++) {
		years.push(i.toString())
	}
</script>

<div class="wrapper">
	<label for="year" />
	<input autocomplete="off" list="years" id="year" name="year" class="input" />

	<datalist id="years">
		{#each years as year}
			<option class="option" value={year}>{year}</option>
		{/each}
	</datalist>

	<!-- <selectmenu>
		{#each years as year}
			<option class="option" value={year}>{year}</option>
		{/each}
	</selectmenu> -->
</div>

<style lang="scss">
	.wrapper {
		position: relative;
	}
	.input {
		border: 1px solid pink;
	}

	datalist {
		position: absolute;
		top: 0;
		left: 0;
		height: 100px;
		width: 400px;
		border: 1px solid red;
	}

	.option:hover {
		background-color: lightblue;
	}
</style>
