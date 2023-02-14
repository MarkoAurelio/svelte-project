<script>
	import { onMount } from "svelte";
	import {select} from './../utils/select'

	const start = async (e)	=> {
		const {celebs, lookup} = await celebs_promise;
		selection = select(celebs, lookup, e.detail.category.slug);
	};

	let celebs_promise;
	const load_celebs = async () => {
		const res = await fetch('https://cameo-explorer.netlify.app/celebs.json');
		const data = await res.json();

		const lookup = new Map();
		const subset = new Set();

		data.forEach(c => {
			lookup.set(c.id, c)
		});
		
		data.forEach(c => {
			if(c.reviews >= 50) {
				subset.add(c);
				c.similar.forEach(id => {
					subset.add(lookup(id));
				})
			}
		});

		return {
			celebs: Array.from(subset),
			lookup,
		}
	};

	onMount(() => {
		celebs_promise = load_celebs();
	});
</script>

<section>
</section>

<style>
</style>