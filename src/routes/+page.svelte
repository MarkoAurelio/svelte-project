<svelte:head>
	<title>Cameoparison</title>
</svelte:head>

<script>
	import Welcome from "../screens/Welcome.svelte";
	import Game from "../screens/Game.svelte";
	import { select, load_image } from '../utils/select';
	import { onMount } from 'svelte';

	let celebs_promise;
	let state = 'welcome'; // 'welcome' or 'playing'
	let selection;

	const start = async (e) => {
		const { celebs, lookup } = await celebs_promise;

		selection = select(celebs, lookup, e.detail.category.slug);
		state = 'playing';
	};

	const load_celebs = async () => {
		const res = await fetch('https://cameo-explorer.netlify.app/celebs.json');
		const data = await res.json();

		const lookup = new Map();

		data.forEach(c => {
			lookup.set(c.id, c);
		});

		const subset = new Set();
		data.forEach(celeb => {
			if (celeb.reviews >= 50) {
				subset.add(celeb);
				celeb.similar.forEach(id => {
					subset.add(lookup.get(id));
				});
			}
		});

		return {
			celebs: Array.from(subset),
			lookup
		};
	};

	onMount(() => {
		celebs_promise = load_celebs();
		load_image('src/lib/images/right.svg')
		load_image('src/lib/images/wrong.svg')
	});
</script>

{#if state === 'welcome'}
	<Welcome on:select={start}/>
{:else if state === 'playing'}
	<Game {selection} on:restart={() => state = 'welcome'}/>
{/if}
