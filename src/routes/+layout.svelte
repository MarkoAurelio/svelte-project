<script>
	import './styles.css'
</script>

<div class="app">
	<main>
		<slot />
	</main>
</div>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 800px;
		margin: 0 auto;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
