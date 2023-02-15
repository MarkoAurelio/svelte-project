export const pick_random = (array) => {
	const index = Math.floor(array.length * Math.random());
	return array[index];
}

export const sleep = (ms) => {
	return new Promise(fulfil => {
		setTimeout(fulfil, ms)
	})
}

export const load_image = (src) => {
	return new Promise((fulfil, reject) => {
		const img = new Image();
		img.onload = () => fulfil(img);
		img.onerror = reject;
		img.src = src;
	})
}

const ROUNDS_PER_GAME = 10;

function remove(array, index) {
	if (index === -1) return;
	array[index] = array[array.length - 1];
	array.pop();
}

export function select(celebs, lookup, category) {
	const filtered = celebs.filter(c => {
		return c.categories.includes(category);
	});

	const seen = new Set();
	const selection = [];

	let i = ROUNDS_PER_GAME;
	while (i--) {
		const n = Math.random();
		const ai = Math.floor(n * filtered.length);
		const a = filtered[ai];

		remove(filtered, ai);

		let b;
		const similar = a.similar.filter(id => !seen.has(id));
		if ((similar.length > 0) && (Math.random() < 0.75)) {
			const id = pick_random(similar);
			b = lookup.get(id);
		} else {
			b = pick_random(filtered);
		}

		selection.push({ a, b });

		seen.add(a.id);
		seen.add(b.id);

		remove(filtered, filtered.indexOf(b));
	}

	return selection;
}