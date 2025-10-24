//All recipes are fetched here then exported to other components
/** @type {import('./$types').PageLoad} */

// export async function load({ fetch }) {
// 	const res = await fetch('/recipe.json');
// 	const recipes = await res.json();
// 	return { recipes };
// }
import recipes from '$lib/data/recipe.json' assert { type: 'json' };

export function load() {
	return { recipes };
}
