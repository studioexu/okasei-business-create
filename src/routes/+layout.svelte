<script lang="ts" context="module">
	import Header from '@/views/Header.svelte'
	import Sidebar from '@/views/Sidebar.svelte'
</script>

<script lang="ts"></script>

<Header pageTitle="aaa" />
<Sidebar />

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(a) {
		color: inherit;
		cursor: pointer;
		text-decoration: none;
	}

	:global(body) {
		overscroll-behavior-x: none;
	}

  :global(.large) {
    font-size: 21px;
    font-weight: bold;
  }
</style>
