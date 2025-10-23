//All recipes are fetched here then exported to other components
/** @type {import('./$types').PageLoad} */

export async function load({ fetch }) {
	const res = await fetch('/recipe.json');
	const recipes = await res.json();
	return { recipes };
}
