<script>
	let { selectedRecipeProp, itemCount, planner, recipes, updateCount } = $props();
	import PlannerRecipe from '$lib/classes/PlannerRecipe';
	function addToPlanner() {
		const isFound = planner.find((r) => r.id === selectedRecipeProp.id);

		if (isFound) {
			const foundRecipe = recipes.find((r, i, arr) => arr[i].id === isFound.id);
			updateCount(foundRecipe, itemCount);
		} else {
			planner.push(new PlannerRecipe(selectedRecipeProp, itemCount, recipes));
		}
	}
</script>

{#if selectedRecipeProp}
	<section class="recipe-card">
		<header class="recipe-header">
			<a
				href="https://paxdei.gaming.tools/{selectedRecipeProp.outputs[0].entity
					.listingPath}/{selectedRecipeProp.outputs[0].entity.id}"
				target="_blank"
				><img
					src={'https://gtcdn.info/paxdei/' + selectedRecipeProp.iconPath.replace('{height}', 64)}
					alt={selectedRecipeProp.name}
					class="main-icon"
				/></a
			>
			<div class="header-info">
				<h2>
					{selectedRecipeProp.name} (x{selectedRecipeProp.outputs[0].count * itemCount})
				</h2>
				<p>
					{#if selectedRecipeProp.tier}
						<span>Tier: {selectedRecipeProp.tier}</span>{/if}
					<span>Type: {selectedRecipeProp.outputs[0].entity.entityTypeName}</span>
					{#if selectedRecipeProp.quality}
						<span
							>Quality: {selectedRecipeProp.quality.charAt(0).toUpperCase() +
								selectedRecipeProp.quality.slice(1)}</span
						>
					{/if}
				</p>
			</div>
			{#if selectedRecipeProp.itemIngredients.length > 0}
				<button class="add-to-planner" onclick={() => addToPlanner()}>Add to Planner</button>
			{/if}
		</header>
		{#if selectedRecipeProp.itemIngredients.length > 0}
			<div class="ingredients-section">
				<h3>Ingredients</h3>
				<ul class="ingredients-list">
					{#each selectedRecipeProp.itemIngredients as ingredient}
						<li class="ingredient-item">
							<a
								href="https://paxdei.gaming.tools/{ingredient.entity.listingPath}/{ingredient.entity
									.id}"
								target="_blank"
								rel="noopener noreferrer"
								><img
									src={'https://gtcdn.info/paxdei/' +
										ingredient.entity.iconPath.replace('{height}', 64)}
									alt={ingredient.entity.name}
									class="ingredient-icon"
								/></a
							>
							<div class="info">
								<div class="info-title">
									<img
										class="ingredient-tier-icon"
										src={'https://gtcdn.info/paxdei/' +
											ingredient.entity.tierIconPath.replace('{height}', 64)}
										alt={ingredient.entity.name}
									/>
									<h4>{ingredient.entity.name} (x{ingredient.count * itemCount})</h4>
								</div>

								<p>
									<span>Tier: {ingredient.entity.tier}</span>

									<span>Type: {ingredient.entity.entityTypeName}</span>
								</p>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
		<div class="skill-section">
			<h3>Required Skill</h3>
			<div class="skill-info">
				<p><span>Skill:</span> <span>{selectedRecipeProp.skillRequired.name}</span></p>
				<p><span>Skill Difficulty:</span> <span>{selectedRecipeProp.skillDifficulty}</span></p>
				<p><span>Skill Cap:</span> <span>{selectedRecipeProp.skillRequired.skillLevelCap}</span></p>
				<p>
					<span>Minimum Skill to Unlock:</span>
					<span
						>{#if selectedRecipeProp.unlockAtSkillLevel}
							{selectedRecipeProp.unlockAtSkillLevel}
						{:else}0
						{/if}</span
					>
				</p>

				<p>
					{#if selectedRecipeProp.xpMultiplier}<span>XP Multiplier:</span>
						<span>{selectedRecipeProp.xpMultiplier}</span>{/if}
				</p>
			</div>
		</div>
	</section>
{:else}{/if}

<style>
	.recipe-card {
		background: #262a33;
		border-radius: 8px;
		padding: 20px;
		color: #fff;
		font-family: sans-serif;
	}

	/* --- Header --- */
	.recipe-header {
		display: flex;
		align-items: center;
		padding-bottom: 15px;
		border-bottom: 1px solid #3a3f4c;
		margin-bottom: 15px;
		position: relative;
	}

	.main-icon {
		width: 64px;
		height: 64px;
		border-radius: 6px;
		margin-right: 15px;
		background: #3a3f4c;
		flex-shrink: 0;
	}
	.info-title {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.header-info h2 {
		margin: 0 0 5px 0;
		color: #fff;
	}

	.header-info p {
		margin: 0;
		font-size: 0.9em;
		color: #ccc;
	}

	.header-info p span {
		margin-right: 15px;
	}

	/* --- Section Headers --- */
	h3 {
		color: #fff;
		border-bottom: 1px solid #4a4a88;
		padding-bottom: 5px;
		margin-top: 0;
	}

	/* --- Ingredients --- */
	.ingredients-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.ingredient-item {
		display: flex;
		align-items: center;
		background: #3a3f4c;
		border-radius: 6px;
		padding: 10px;
		margin-bottom: 10px;
	}

	.ingredient-icon {
		width: 40px;
		height: 40px;
		border-radius: 4px;
		margin-right: 10px;
		background: #262a33;
		flex-shrink: 0;
	}
	.ingredient-tier-icon {
		width: 20px;
		height: 20px;
		border-radius: 4px;
		margin-right: 10px;
		background: #262a33;
		flex-shrink: 0;
	}

	.ingredient-item .info h4 {
		margin: 0 0 4px 0;
		font-size: 1em;
	}

	.ingredient-item .info p {
		margin: 0;
		font-size: 0.8em;
		color: #ccc;
	}

	.ingredient-item .info p span:first-child {
		margin-right: 15px;
	}

	/* --- Skill --- */
	.skill-info {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		background: #3a3f4c;
		padding: 15px;
		border-radius: 6px;
	}

	.skill-info p {
		margin: 0;
		padding: 5px 0;
		display: flex;
		justify-content: space-between;
		font-size: 0.9em;
		border-bottom: 1px solid #262a33;
	}

	.skill-info p:last-child {
		border-bottom: none;
	}

	.skill-info p span:first-child {
		color: #ccc;
	}
	.skill-info p span:last-child {
		font-weight: bold;
	}
	.add-to-planner {
		position: absolute;
		right: 0;
		padding: 0.6rem 1rem;
		border: none;
		border-radius: 0.75rem;
		background-color: #262a33;
		color: #f5f5f5;
		font-weight: 500;
		cursor: pointer;
		transition:
			transform 0.15s ease,
			background-color 0.2s ease,
			box-shadow 0.2s ease;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
	}

	.add-to-planner:hover {
		transform: scale(1.04);
		background-color: #3a3f4c;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
	}

	.add-to-planner:active {
		transform: scale(0.98);
		background-color: hsl(222, 13%, 19%);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
	}

	.add-to-planner:focus-visible {
		outline: 2px solid #6666aa;
		outline-offset: 3px;
	}
</style>
