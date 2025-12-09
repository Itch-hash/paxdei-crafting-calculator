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
	import MaterialBreakdown from './MaterialBreakdown.svelte';

	let { data } = $props();
	let recipes = data.recipes;

	let recipeImages = recipes.map((element, i, array) => {
		return array[i].iconPath;
	});

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
			planner = normalizePlannerTree(parsed);
		}
	});
	$effect(() => {
		if (planner) {
			localStorage.setItem('planner', JSON.stringify(planner));
		}
	});
	function updateCount(item, newValue) {
		const index = planner.findIndex((i) => i.id === item.id);
		const isFound = planner.find((r) => r.id === item.id);
		const foundRecipe = recipes.find((r, i, arr) => arr[i].id === isFound.id);
		planner[index] = new PlannerRecipe(foundRecipe, newValue, recipes);
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
