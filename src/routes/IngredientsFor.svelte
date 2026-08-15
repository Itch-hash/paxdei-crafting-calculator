<script>
	import { buildAssetUrl } from '$lib/utils/assets';
	let { selectedRecipeProp, recipes } = $props();
	let relatedRecipes = $state([]);

	$effect(() => {
		const results = [];
		for (let relatedRecipe of recipes) {
			for (let ingredient of relatedRecipe.itemIngredients) {
				if (selectedRecipeProp.name === ingredient.entity.name) {
					results.push(relatedRecipe);
				}
			}
		}
		relatedRecipes = results;
	});
</script>

{#if !relatedRecipes.length == 0}
	<section>
		<h2>
			Used Also As An Ingredient For {relatedRecipes.length}
			{#if relatedRecipes.length == 1}
				Recipe
			{:else}Recipes
			{/if}
		</h2>
		<ul id="ingredient-for-list"></ul>

		<div>
			{#if relatedRecipes.length >= 1}
				{#each relatedRecipes as relatedRecipe (relatedRecipe.id)}
					<a
						href="https://paxdei.gaming.tools/{relatedRecipe.outputs[0].entity
							.listingPath}/{relatedRecipe.outputs[0].entity.id}"
						target="_blank"
						><img
							src={buildAssetUrl(relatedRecipe.iconPath)}
							alt={relatedRecipe.name}
							class="ingredient-icon"
						/></a
					>
				{/each}
			{/if}
		</div>
	</section>
{/if}

<style>
	.ingredient-icon {
		width: 7rem;
		height: 7rem;
		border-radius: 4px;
		margin-right: 10px;
		background: #262a33;
		flex-shrink: 0;
	}
</style>
