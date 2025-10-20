<script>
	import AttributesEffects from './AttributesEffects.svelte';
	import Recipe from './Recipe.svelte';
	import SearchItem from './SearchItem.svelte';

	let { data } = $props();
	let recipes = data.recipes;

	let recipeNames = recipes.map((element, i, array) => {
		return array[i].name;
	});
	let recipeImages = recipes.map((element, i, array) => {
		return array[i].iconPath;
	});
</script>

<main>
	<!-- Search / Item Select -->
	<SearchItem {recipeNames} />

	<!-- Recipe Display -->
	<Recipe {recipeImages} />

	<!-- Attributes / Effects -->
	<AttributesEffects />
</main>

<style>
	main {
		max-width: 900px;
		margin: auto;
	}
</style>
