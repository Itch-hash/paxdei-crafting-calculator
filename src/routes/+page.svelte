<script>
	import AttributesEffects from './AttributesEffects.svelte';
	import Recipe from './Recipe.svelte';
	import SearchItem from './SearchItem.svelte';

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
</script>

<main>
	<!-- Search / Item Select -->
	<SearchItem {recipes} bind:selectedRecipeProp />

	<!-- Recipe Display -->
	{#if selectedRecipeProp}
		<Recipe {selectedRecipeProp} />
		<AttributesEffects {selectedRecipeProp} />
	{/if}

	<!-- Attributes / Effects -->
</main>

<style>
	main {
		max-width: 900px;
		margin: auto;
	}
</style>
