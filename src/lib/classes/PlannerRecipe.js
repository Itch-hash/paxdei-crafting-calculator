export default class PlannerRecipe {
	constructor(selectedRecipe, count, allRecipes) {
		const recipeData = JSON.parse(JSON.stringify(selectedRecipe));
		this.name = recipeData.name;
		this.iconPath = recipeData.iconPath;
		this.count = count;
		this.output = recipeData.outputs[0].count * this.count;
		this.id = recipeData.id;
		this.ingredients = this.buildIngredientItems(recipeData.itemIngredients, allRecipes);
	}
	buildIngredientItems(ingredients, allRecipes, multiplier = this.count) {
		let result = [];

		for (let ingredient of ingredients) {
			let baseAmount = ingredient.count;
			let totalAmount = baseAmount * multiplier;

			let found = false;

			for (let recipe of allRecipes) {
				if (ingredient.entity.id === recipe.outputs[0].entity.id) {
					found = true;
					let craftsNeeded = totalAmount / recipe.outputs[0].count;
					const subIngredients = this.buildIngredientItems(
						recipe.itemIngredients,
						allRecipes,
						craftsNeeded
					);

					result.push({
						id: ingredient.entity.id,
						name: ingredient.entity.name,
						iconPath: ingredient.entity.iconPath,
						totalAmount,
						subIngredients,
						output: recipe.outputs[0].count * craftsNeeded
					});

					break; // stop searching other recipes once a match is found
				}
			}

			// If no recipe produced this ingredient → it’s a raw material
			if (!found) {
				result.push({
					id: ingredient.entity.id,
					name: ingredient.entity.name,
					iconPath: ingredient.entity.iconPath,
					totalAmount,
					subIngredients: []
				});
			}
		}
		return result;
	}
}
