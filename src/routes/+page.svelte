<script>
	import IngredientsFor from './IngredientsFor.svelte';
	import Recipe from './Recipe.svelte';
	import SearchItem from './SearchItem.svelte';
	import Standby from './Standby.svelte';

	let { data } = $props();
	let recipes = data.recipes;

	let recipeImages = recipes.map((element, i, array) => {
		return array[i].iconPath;
	});

	let selectedRecipeProp = $state(null);
	let itemCount = $state(1);
	$effect(() => console.log(selectedRecipeProp));
</script>

<main>
	<SearchItem {recipes} bind:selectedRecipeProp bind:itemCount />

	{#if !selectedRecipeProp}
		<Standby />
	{:else}
		<Recipe {selectedRecipeProp} {itemCount} />
		<IngredientsFor {selectedRecipeProp} {recipes} />
	{/if}
</main>

<style>
	main {
		max-width: 900px;
		margin: auto;
	}
</style>
