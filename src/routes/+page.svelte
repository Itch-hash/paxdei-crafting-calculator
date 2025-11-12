<script>
	import IngredientsFor from './IngredientsFor.svelte';
	import Planner from './Planner.svelte';
	import Recipe from './Recipe.svelte';
	import SearchItem from './SearchItem.svelte';
	import Standby from './Standby.svelte';
	import PlannerRecipe from '$lib/classes/PlannerRecipe';

	let { data } = $props();
	let recipes = data.recipes;

	let recipeImages = recipes.map((element, i, array) => {
		return array[i].iconPath;
	});

	let selectedRecipeProp = $state(null);
	let itemCount = $state(1);
	let planner = $state([]);
</script>

<main>
	<SearchItem {recipes} bind:selectedRecipeProp bind:itemCount />

	{#if !selectedRecipeProp}
		<Standby />
	{:else}
		<Recipe {selectedRecipeProp} {itemCount} {planner} {recipes} />
		<IngredientsFor {selectedRecipeProp} {recipes} />
	{/if}
	<Planner {selectedRecipeProp} {itemCount} bind:planner {recipes} />
</main>

<style>
	main {
		max-width: 900px;
		margin: auto;
	}
</style>
