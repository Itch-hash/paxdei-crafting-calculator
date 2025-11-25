//All recipes are fetched here then exported to other components
/** @type {import('./$types').PageLoad} */

import recipes from '$lib/data/recipe.json' assert { type: 'json' };

export function load() {
	return { recipes };
}
