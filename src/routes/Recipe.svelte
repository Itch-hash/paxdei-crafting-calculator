<script>
	let { selectedRecipeProp } = $props();
	$effect(() => console.log($inspect(selectedRecipeProp)));
	const formattedImages = recipeImages.map((url) => url.replace('{height}', 256));
	let recipeImageRefined = `https://gtcdn.info/paxdei/${formattedImages[190]}`;
</script>

<section class="recipe-section">
	<h2>Recipe</h2>
	<div class="recipe-card">
		<div class="recipe-header">
			<img src={recipeImageRefined} alt="Item Icon" id="itemIcon" />
			<div>
				<h3 id="itemName">Select an item</h3>
				<p id="itemTier">Tier: -</p>
				<p id="itemSkill">Skill Required: -</p>
			</div>
		</div>

		<div class="recipe-body">
			<h4>Ingredients</h4>
			<ul id="ingredientList">
				<!-- Ingredients go here -->
				<li>No ingredients yet</li>
			</ul>
		</div>

		<div class="recipe-footer">
			<h4>Total Raw Materials</h4>
			<ul id="materialsList">
				<!-- Flattened totals go here -->
			</ul>
		</div>
	</div>
</section>

<style>
	.recipe-card {
		background: #262a33;
		padding: 20px;
		border-radius: 10px;
		margin-bottom: 20px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.recipe-header {
		display: flex;
		align-items: center;
		margin-bottom: 15px;
	}

	.recipe-header img {
		width: 64px;
		height: 64px;
		margin-right: 15px;
		border: 2px solid #ddd;
		border-radius: 8px;
		background: #fafafa;
	}

	.recipe-header h3 {
		margin-bottom: 5px;
	}

	.recipe-body,
	.recipe-footer {
		margin-top: 15px;
	}

	ul {
		list-style: none;
	}

	ul li {
		padding: 5px 0;
		border-bottom: 1px solid #eee;
	}

	ul li:last-child {
		border-bottom: none;
	}
</style>
