<script>
	import IngredientsFor from './IngredientsFor.svelte';
	import Planner from './Planner.svelte';
	import Recipe from './Recipe.svelte';
	import SearchItem from './SearchItem.svelte';
	import Standby from './Standby.svelte';
	import PlannerRecipe from '$lib/classes/PlannerRecipe';
	import Updates from './Updates.svelte';
	import MissingRecipe from './MissingRecipe.svelte';

	let { data } = $props();
	let recipes = data.recipes;

	let recipeImages = recipes.map((element, i, array) => {
		return array[i].iconPath;
	});

	let selectedRecipeProp = $state(null);
	let itemCount = $state(1);
	let planner = $state([]);
	$effect(() => {
		const saved = localStorage.getItem('planner');
		if (saved) planner = JSON.parse(saved);
	});
	$effect(() => {
		localStorage.setItem('planner', JSON.stringify(planner));
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
