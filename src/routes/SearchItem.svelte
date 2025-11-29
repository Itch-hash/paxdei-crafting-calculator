<script>
	let { recipes, selectedRecipeProp = $bindable(null), itemCount = $bindable(1) } = $props();
	let searchTerm = $state('');
	let isFocused = $state(false);
	const recipeNames = recipes.map((element, i, array) => {
		return array[i].name;
	});
	const recipeIDs = recipes.map((element, i, array) => {
		return array[i].id;
	});

	const filteredSearchTerm = $derived(searchTerm.replace('(Alternative)', '').trim());
	const filteredRecipe = $derived(
		recipes.filter((element, i, array) => {
			if (array[i].name == filteredSearchTerm) {
				return element;
			}
		})
	);
	const selectedRecipe = $derived(
		filteredRecipe.find((element, i, array) => {
			if (array[i + 1] == null) {
				return element;
			} else {
				if (array[i].name == array[i + 1].name && !searchTerm.includes('Alternative')) {
					return array[i];
				}
			}
		})
	);

	const filteredNames = $derived(
		recipeNames.filter((element) => {
			if (isFocused || searchTerm !== '') {
				return element.toLowerCase().includes(searchTerm.toLowerCase());
			}
		})
	);

	function selectName(name, isAlternative = false) {
		if (!isAlternative) {
			searchTerm = name;
			selectedRecipeProp = selectedRecipe;
		} else {
			searchTerm = `${name} (Alternative)`;
			selectedRecipeProp = selectedRecipe;
		}
	}
</script>

<section class="search-section">
	<label for="itemSearch">Choose Item:</label>
	<input
		autocomplete="off"
		type="text"
		id="itemSearch"
		placeholder="Search for an item..."
		bind:value={searchTerm}
		onfocus={() => (isFocused = true)}
		onblur={() => (isFocused = false)}
	/>
	{#if isFocused && searchTerm !== '' && filteredNames.length > 0}
		<ul class="results-list" role="listbox">
			{#each filteredNames as name, i}
				{#if i > 0 && filteredNames[i] === filteredNames[i - 1]}
					<li
						role="option"
						tabindex="0"
						aria-selected="false"
						onmousedown={() => {
							selectName(name, true);
						}}
					>
						{name} (Alternative)
					</li>
				{:else}
					<li
						role="option"
						tabindex="0"
						aria-selected="false"
						onmousedown={() => {
							selectName(name, false);
							itemCount = 1;
						}}
					>
						{name}
					</li>
				{/if}
			{/each}
		</ul>
	{/if}

	<label class="itemCount" for="itemCount">Count:</label>
	<input type="number" id="itemCount" class="count-input" min="1" bind:value={itemCount} />
</section>

<style>
	.search-section {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		position: relative;
		background: #262a33;
		padding: 15px;
		border-radius: 8px;
		margin-bottom: 20px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
	}
	.search-section label {
		font-weight: bold;
		margin-right: 10px;
	}

	.search-section input {
		padding: 8px;
		border: 1px solid #797979;
		color: white;
		border-radius: 6px;
		max-width: 250px;
		margin-right: 10px;
		background-color: #262a33;
	}
	.results-list {
		position: absolute;
		top: 100%;
		z-index: 10;
		background: #3a3f4c;
		border: 1px solid #32325a;
		border-top: none;
		border-radius: 0 0 8px 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
		list-style: none;
		padding: 0;
		margin: 0;
		max-height: 150px;
		overflow-y: auto;
		scrollbar-width: thin;
	}
	.results-list li {
		padding: 10px 15px;
		color: #fff;
		cursor: pointer;
		border-bottom: 1px solid #262a33;
	}

	.results-list li:last-child {
		border-bottom: none;
	}

	.results-list li:hover {
		background: #4a4a88;
	}
	.count-input {
		padding: 8px;
		border: 1px solid #797979;
		border-radius: 6px;
		width: 70px;
		margin-right: 10px;
		color: white;
		background: #fff;

		background-color: #262a33;
		text-align: center;
	}

	.itemCount {
		font-weight: bold;
		margin-right: 10px;
	}
	input[type='number'] {
		color-scheme: dark;
	}
</style>
