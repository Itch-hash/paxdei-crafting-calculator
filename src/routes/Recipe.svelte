<script>
	let { selectedRecipeProp, itemCount } = $props();
</script>

{#if selectedRecipeProp}
	<section class="recipe-card">
		<header class="recipe-header">
			<img
				src={'https://gtcdn.info/paxdei/' + selectedRecipeProp.iconPath.replace('{height}', 64)}
				alt={selectedRecipeProp.name}
				class="main-icon"
			/>
			<div class="header-info">
				<a
					href="https://paxdei.gaming.tools/{selectedRecipeProp.outputs[0].entity
						.listingPath}/{selectedRecipeProp.outputs[0].entity.id}"
					target="_blank"><h2>{selectedRecipeProp.name}</h2></a
				>
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
		</header>

		<div class="ingredients-section">
			<h3>Ingredients</h3>
			<ul class="ingredients-list">
				{#each selectedRecipeProp.itemIngredients as ingredient}
					<li class="ingredient-item">
						<img
							src={'https://gtcdn.info/paxdei/' +
								ingredient.entity.iconPath.replace('{height}', 64)}
							alt={ingredient.entity.name}
							class="ingredient-icon"
						/>
						<div class="info">
							<div class="info-title">
								<img
									class="ingredient-tier-icon"
									src={'https://gtcdn.info/paxdei/' +
										ingredient.entity.tierIconPath.replace('{height}', 64)}
									alt={ingredient.entity.name}
								/>
								<a
									href="https://paxdei.gaming.tools/{ingredient.entity.listingPath}/{ingredient
										.entity.id}"
									target="_blank"
									><h4>{ingredient.entity.name} (x{ingredient.count * itemCount})</h4></a
								>
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
	.info-title a {
		text-decoration: none;
		color: white;
	}
	.header-info h2 {
		margin: 0 0 5px 0;
		color: #fff;
	}
	.header-info a {
		text-decoration: none;
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
</style>
