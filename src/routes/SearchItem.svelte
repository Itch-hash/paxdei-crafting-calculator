<script>
	let { recipeNames } = $props();
	let searchTerm = $state('');
	let isFocused = $state(false);

	let filteredNames = $derived(
		recipeNames.filter((element) => {
			if (isFocused || !searchTerm == '') {
				return element.toLowerCase().includes(searchTerm.toLowerCase());
			}
		})
	);

	function selectName(name) {
		searchTerm = name;
	}

	$effect(() => console.log());
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
			{#each filteredNames as name}
				<li role="option" tabindex="0" aria-selected="false" onmousedown={() => selectName(name)}>
					{name}
				</li>
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
