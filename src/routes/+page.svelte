<script>
	import IngredientsFor from './IngredientsFor.svelte';
	import Planner from './Planner.svelte';
	import Recipe from './Recipe.svelte';
	import SearchItem from './SearchItem.svelte';
	import Standby from './Standby.svelte';
	import PlannerRecipe from '$lib/classes/PlannerRecipe';
	import Updates from './Updates.svelte';
	import MissingRecipe from './MissingRecipe.svelte';
	//TO be removed

	let { data } = $props();
	let recipes = $derived(data.recipes);

	let recipeImages = $derived(
		recipes.map((element, i, array) => {
			return array[i].iconPath;
		})
	);

	let selectedRecipeProp = $state(null);
	let itemCount = $state(1);
	let planner = $state([]);

	//For restructuring old node structures from .subIngredients to .Ingredients
	function normalizePlannerTree(node) {
		if (Array.isArray(node)) {
			return node.map(normalizePlannerTree);
		}
		if (typeof node !== 'object' || node === null) {
			return node;
		}

		let normalized = { ...node };

		let children = normalized.ingredients ?? normalized.subIngredients ?? [];

		normalized.ingredients = children.map(normalizePlannerTree);

		delete normalized.subIngredients;

		return normalized;
	}

	$effect(() => {
		const saved = localStorage.getItem('planner');
		if (saved) {
			let parsed = JSON.parse(saved);

			// MIGRATION OCCURS HERE
			// A saved entry is a denormalized snapshot, so it keeps whatever ingredients and
			// quantities were current when it was added. Rebuild each one against today's
			// recipes so a data update reaches saved plans, and drop entries whose recipe no
			// longer exists — updateCount would otherwise choke on the missing recipe.
			planner = normalizePlannerTree(parsed)
				.map((entry) => {
					const recipe = recipes.find((r) => r.id === entry.id);
					// count is persisted as a string; PlannerRecipe multiplies with it
					return recipe ? new PlannerRecipe(recipe, Number(entry.count) || 1, recipes) : null;
				})
				.filter(Boolean);
		}
	});
	$effect(() => {
		if (planner) {
			localStorage.setItem('planner', JSON.stringify(planner));
		}
	});
	function updateCount(item, newValue) {
		const index = planner.findIndex((i) => i.id === item.id);
		const foundRecipe = recipes.find((r) => r.id === item.id);
		if (index === -1 || !foundRecipe) return;
		planner[index] = new PlannerRecipe(foundRecipe, Number(newValue) || 1, recipes);
	}
</script>

<main>
	<SearchItem {recipes} bind:selectedRecipeProp bind:itemCount />

	{#if !selectedRecipeProp}
		<Standby />
	{:else}
		<Recipe {selectedRecipeProp} {itemCount} {planner} {recipes} {updateCount} />
		<IngredientsFor {selectedRecipeProp} {recipes} />
	{/if}
	<Planner {selectedRecipeProp} {itemCount} bind:planner {recipes} {updateCount} />
	<Updates />
	<MissingRecipe {recipes} {selectedRecipeProp} />
</main>

<style>
	main {
		max-width: 900px;
		margin: auto;
	}
</style>
