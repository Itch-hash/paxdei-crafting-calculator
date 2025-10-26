<script>
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

	$effect(() => console.log(relatedRecipes));
</script>

{#if !relatedRecipes.length == 0}
	<section class="ingredient-for-section">
		<h2>Used as an Ingredient For {relatedRecipes.length} Recipes</h2>
		<ul id="ingredient-for-list"></ul>

		<div class="ingredient-for-info">
			{#if relatedRecipes.length > 1}
				{#each relatedRecipes as relatedRecipe}
					<a
						href="https://paxdei.gaming.tools/{relatedRecipe.outputs[0].entity
							.listingPath}/{relatedRecipe.outputs[0].entity.id}"
						target="_blank"
						><img
							src={'https://gtcdn.info/paxdei/' + relatedRecipe.iconPath.replace('{height}', 64)}
							alt={relatedRecipe.name}
							class="ingredient-icon"
						/></a
					>
				{/each}
			{/if}
		</div>
	</section>
{/if}
