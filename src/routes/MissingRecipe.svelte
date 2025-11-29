<script>
	let { recipes, selectedRecipeProp } = $props();
	let formClicked = $state(false);
	let selectedOption = $state();
	let currentRecipe = $state(false);
	let checkLink = $state('');
</script>

<div class="report-div">
	<button onclick={() => (formClicked = true)} class="report-recipe"
		>Missing/Incorrect Recipe?</button
	>
</div>
{#if formClicked}
	<div class="form-div">
		<button class="close-btn" onclick={() => (formClicked = false)}>×</button>
		<div class="select-radio">
			<div>
				<label for="missing-recipe">Missing Recipe</label>
				<input
					type="radio"
					name="report-recipe"
					id="missingRecipe"
					value="missingRecipe"
					bind:group={selectedOption}
				/>
			</div>
			<div>
				<label for="incorrect-recipe">Incorrect Recipe</label>
				<input
					type="radio"
					name="report-recipe"
					id="incorrectRecipe"
					value="incorrectRecipe"
					bind:group={selectedOption}
				/>
			</div>
		</div>

		{#if selectedOption == 'missingRecipe'}
			<h3>Fill in The Recipe Details</h3>
			<form action="https://api.web3forms.com/submit" method="POST">
				<input type="hidden" name="access_key" value="1623eb48-fde5-4254-88ea-8bd551c3b292" />
				<label for="recipe"
					>Paste Missing Recipe Link from <i
						><a href="https://paxdei.gaming.tools/recipes" target="_blank">here</a></i
					></label
				>
				<input
					type="url"
					contenteditable="true"
					name="recipe"
					required
					placeholder="https://paxdei.gaming.tools/recipes/..."
					bind:value={checkLink}
				/>
				<label for="recipe">Comment <i>optional</i></label>
				<input type="text" name="recipe" />

				{#if checkLink.includes('https://paxdei.gaming.tools/recipes/')}
					<button class="submit-button" type="submit">Submit</button>
				{/if}
			</form>
			<p><i>please give at least 24h for the request to be processed</i></p>
		{/if}
		<!---->
		{#if selectedOption == 'incorrectRecipe'}
			<h3>Fill in The Recipe Details</h3>
			<div>
				<label for="checkrecipe">Current Recipe?</label>
				<input type="checkbox" name="checkrecipe" id="" bind:checked={currentRecipe} />
			</div>

			<form action="https://api.web3forms.com/submit" method="POST">
				<input type="hidden" name="access_key" value="1623eb48-fde5-4254-88ea-8bd551c3b292" />
				{#if currentRecipe && !selectedRecipeProp}
					{(checkLink = '')}
					<p style="color: red;"><i>please select a recipe first and select this option</i></p>
				{:else if currentRecipe && selectedRecipeProp}
					{(checkLink = '')}
					<label for="recipe">Recipe Name</label>
					<input type="text" name="recipe" value={selectedRecipeProp.name} required readonly />
					{#each selectedRecipeProp.itemIngredients as ingredient, i}
						<div>
							<label for="ingredient + {i}">Ingredient #{i + 1}</label>
							<input type="text" name="ingredient + {i}" value={ingredient.entity.name} readonly />
						</div>
					{/each}
					<button class="submit-button" type="submit">Submit</button>
					{#if checkLink.includes('https://paxdei.gaming.tools/recipes/')}
						<button class="submit-button" type="submit">Submit</button>
					{/if}
				{:else}
					<label for="recipe"
						>Paste Incorrect Recipe Link from <i
							><a href="https://paxdei.gaming.tools/recipes" target="_blank">here</a></i
						></label
					>
					<input
						type="url"
						contenteditable="true"
						name="recipe"
						required
						placeholder="https://paxdei.gaming.tools/recipes/..."
						bind:value={checkLink}
					/>
					<label for="recipe">Comment <i>optional</i></label>
					<input type="text" name="recipe" />
					{#if checkLink.includes('https://paxdei.gaming.tools/recipes/')}
						<button class="submit-button" type="submit">Submit</button>
					{/if}
				{/if}
			</form>
			<p><i>please give at least 24h for the request to be processed</i></p>
		{/if}
	</div>
{/if}

<style>
	.close-btn {
		position: fixed;
		color: white;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		transition: color 0.2s ease;
		right: 1rem;
		top: 1rem;
		background: none;
	}

	.close-btn:hover {
		color: #ff5555;
	}
	.form-div {
		display: flex;
		flex-direction: column;
		position: fixed;
		z-index: 1001;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: hsl(222, 15%, 20%);
		box-shadow: 0px 0 12px rgba(0, 0, 0, 0.4);
		padding: 3rem;
		border-radius: 1rem;
		max-height: 80vh;
		overflow-y: auto;
	}
	form input {
		background-color: #262a33;
		color: white;
		border-radius: 1rem;
		padding-left: 1rem;
		padding-top: 0.1rem;
		padding-bottom: 0.1rem;
	}

	form input:focus {
		background-color: #262a33;
		color: white;
		outline: none;
	}

	.report-div {
		display: flex;
		align-items: center;
		margin-top: 2rem;
	}
	.report-recipe {
		width: 8rem;
		margin: auto;
		padding: 0.6rem 1rem;
		border: none;
		border-radius: 0.75rem;
		background-color: #262a33;
		color: white;
		font-weight: 500;
		cursor: pointer;
		transition:
			transform 0.15s ease,
			background-color 0.2s ease,
			box-shadow 0.2s ease;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
	}
	.report-recipe:hover {
		transform: scale(1.04);
		background-color: #3a3f4c;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
	}

	.report-recipe:active {
		transform: scale(0.98);
		background-color: hsl(222, 13%, 19%);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
	}

	.report-recipe:focus-visible {
		outline: 2px solid #6666aa;
		outline-offset: 3px;
	}
	.select-radio {
		display: flex;
		justify-content: center;
		gap: 3rem;
		margin-bottom: 1rem;
		width: 80%;
		margin: 1rem auto 1rem auto;
	}
	.form-div form {
		display: flex;
		flex-direction: column;
	}
	.form-div form button {
		width: 40%;
		align-self: center;
		margin-top: 25px;
	}
	.submit-button {
		border-radius: 0.5rem;
		padding: 0.2rem;
		color: white;
		background-color: #3a3f4c;
		box-shadow: 0px 0 12px rgba(0, 0, 0, 0.4);
		border: 1px black;
	}
</style>
