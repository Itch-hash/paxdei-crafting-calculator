<script>
	let { recipes, selectedRecipeProp = $bindable(null) } = $props();
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
						}}
					>
						{name}
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
</section>

<style>
	.search-section {
		position: relative;
		background: #262a33;
		padding: 15px;
		border-radius: 8px;
		margin-bottom: 20px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.search-section label {
		font-weight: bold;
		margin-right: 10px;
	}

	.search-section input {
		padding: 8px;
		border: 1px solid #ddd;
		border-radius: 6px;
		width: 250px;
		margin-right: 10px;
	}

	.results-list {
		/* --- The Positioning Magic --- */
		position: absolute;
		width: 60%; /* Make it span the full width of the parent */
		top: 100%; /* Start it right below the parent */
		left: 75px;
		z-index: 10; /* Make sure it floats on top of other content */

		/* --- Styling (to match your theme) --- */
		background: #3a3f4c; /* A slightly lighter dark for the dropdown */
		border: 1px solid #32325a; /* Use your button color */
		border-top: none; /* Looks cleaner, as if attached */
		border-radius: 0 0 8px 8px; /* Match your parent's rounded corners */
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
		border-bottom: 1px solid #262a33; /* Use your bg color for a subtle separator */
	}

	/* On the last item, remove the bottom border */
	.results-list li:last-child {
		border-bottom: none;
	}

	/* Hover effect */
	.results-list li:hover {
		background: #4a4a88; /* Use your button color for hover */
	}
</style>
