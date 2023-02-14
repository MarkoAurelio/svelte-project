<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let selected = false;

	const select = (category) => {
		selected = true;
		dispatch('select', { category });
	};

	const categories = [
		{ slug: 'actors', label: 'Actors' },
		{ slug: 'athletes', label: 'Athletes' },
		{ slug: 'comedians', label: 'Comedians' },
		{ slug: 'creators', label: 'Creators' },
		{ slug: 'models', label: 'Models' },
		{ slug: 'musicians', label: 'Musicians' },
		{ slug: 'reality-tv', label: 'Reality TV' }
	];
</script>

<header>
	<h1>
		CameoP<span class="logo">a</span>rison
	</h1>

	<p>
		On <a href="https://cameo.com">cameo.com</a>, you can buy personalised video clips from everyone from Lindsay Lohan to Ice T.
	</p>

	<p>But who commands the highest price?</p>
</header>

<p>Pick a category to play a game:</p>

<div class="categories">
	{#each categories as category}
		<button disabled={selected} on:click={() => select(category)}>{category.label}</button>
	{/each}
</div>
