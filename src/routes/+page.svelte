<script>
	import AttributesEffects from './AttributesEffects.svelte';
	import Recipe from './Recipe.svelte';
	import SearchItem from './SearchItem.svelte';
	import Standby from './Standby.svelte';

	let { data } = $props();
	let recipes = data.recipes;
	// const leatherItems = recipes.filter((element) => {
	// 	if (element.name.includes('Boiled Leather')) {
	// 		return element;
	// 	}
	// });
	// console.log(leatherItems);

	let recipeImages = recipes.map((element, i, array) => {
		return array[i].iconPath;
	});

	let selectedRecipeProp = $state(null);
	let itemCount = $state(1);
</script>

<main>
	<SearchItem {recipes} bind:selectedRecipeProp bind:itemCount />

	{#if !selectedRecipeProp}
		<Standby />
	{:else}
		<Recipe {selectedRecipeProp} {itemCount} />
		<AttributesEffects {selectedRecipeProp} />
	{/if}
</main>

<style>
	main {
		max-width: 900px;
		margin: auto;
	}
</style>
