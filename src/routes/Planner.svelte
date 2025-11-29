<script>
	import PlannerRecipe from '$lib/classes/PlannerRecipe';
	import TreeNode from './TreeNode.svelte';
	let { itemCount, selectedRecipeProp, data, planner, recipes, updateCount } = $props();
	let isOpen = $state(false);
	// $effect(() => $inspect(console.log($inspect(planner))));

	function toggleSidebar() {
		isOpen = !isOpen;
	}
	function removeItem(item) {
		const index = planner.findIndex((i) => i.id === item.id);
		planner.splice(index, 1);
	}
</script>

<!-- Sidebar Toggle Button -->
<button class="sidebar-toggle" onclick={toggleSidebar}>
	☰ Crafting Tree {#if planner}
		{#each planner as item, i}
			<span class="planner-count">{i + 1}</span>
		{/each}
	{/if}</button
>

<!-- Sidebar -->
<aside class="sidebar {isOpen ? 'open' : ''}">
	<header class="sidebar-header">
		<h2>Crafting Queue</h2>
		<button class="close-btn" onclick={toggleSidebar}>×</button>
	</header>
	{#if !planner.length == 0}
		<div class="sidebar-content">
			{#each planner as item}
				<ul class="recipe-tree">
					<li class="main-tree">
						<div class="tree-item">
							<img
								src={'https://gtcdn.info/paxdei/' +
									item.iconPath.replace('{height}', 64) +
									'?1764356679632'}
								alt={item.name}
							/>
							<span class="recipe-name">{item.name} (x{item.output})</span>
							<input
								type="number"
								id="itemCount"
								class="count-input"
								min="1"
								value={item.count}
								onchange={() => updateCount(item, event.target.value)}
							/>
							<button class="tree-btn" onclick={() => removeItem(item)}>×</button>
						</div>
						<ul>
							{#each item.ingredients as ingredient}
								<TreeNode node={ingredient} depth={1} />
							{/each}
						</ul>
					</li>
				</ul>
			{/each}
		</div>
	{:else}
		<p class="no-planner-items">Add Items to Planner to show them here</p>
	{/if}
</aside>

<!-- Overlay -->
<button
	type="button"
	class="overlay {isOpen ? 'active' : ''}"
	aria-label="Close sidebar overlay"
	onclick={toggleSidebar}
></button>

<style>
	/* === Sidebar Toggle Button === */
	.sidebar-toggle {
		position: fixed;
		top: 1rem;
		right: 1rem;
		background: #262a33;
		color: #fff;
		border: none;
		padding: 0.6rem 1rem;
		border-radius: 0.5rem;
		cursor: pointer;
		z-index: 1001;
		transition: background 0.2s ease;
	}
	.sidebar-toggle:hover {
		background: hsl(222, 15%, 25%);
	}
	.planner-count {
		position: absolute;
		top: 0;
		left: 0;
		border: solid red 1px;
		border-radius: 100%;
		padding-right: 2px;
		padding-left: 2px;
		background-color: red;
	}

	/* === Sidebar Container === */
	.sidebar {
		position: fixed;
		top: 0;
		right: -400px;
		width: 400px;
		height: 100%;
		background: #262a33;
		color: #f1f1f1;
		box-shadow: -4px 0 12px rgba(0, 0, 0, 0.4);
		transition: right 0.3s ease-in-out;
		z-index: 1002;
		display: flex;
		flex-direction: column;
	}
	.sidebar.open {
		right: 0;
	}

	/* === Sidebar Header === */
	.sidebar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: #20232b;
		border-bottom: 1px solid #333;
	}
	.sidebar-header h2 {
		margin: 0;
		font-size: 1.2rem;
	}
	.close-btn {
		background: none;
		color: #f1f1f1;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		transition: color 0.2s ease;
	}
	.close-btn:hover {
		color: #ff5555;
	}

	/* === Sidebar Content === */
	.sidebar-content {
		flex: 1;
		padding: 1rem;
		overflow-y: auto;
	}

	/* === Crafting Tree === */
	.recipe-tree {
		list-style: none;
		padding-left: 0;
	}
	.recipe-tree li {
		margin: 0.3rem 0;
		position: relative;
		padding-left: 1.2rem;
	}

	.recipe-tree ul {
		margin-left: 1rem;
		border-left: 1px dashed #555;
		padding-left: 1rem;
	}

	/* === Tree Item with Icon === */
	.tree-item {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}
	.tree-item img {
		width: 32px;
		height: 32px;
		object-fit: contain;
		border-radius: 4px;
		background: #222;
		padding: 2px;
		border: 1px solid #333;
	}

	.recipe-name {
		font-weight: bold;
		color: #ffa726;
	}

	/* === Scrollbar Styling === */
	.sidebar-content::-webkit-scrollbar {
		width: 6px;
	}
	.sidebar-content::-webkit-scrollbar-thumb {
		background: #444;
		border-radius: 4px;
	}
	.sidebar-content::-webkit-scrollbar-thumb:hover {
		background: #666;
	}
	.main-tree {
		border-bottom: 4px solid #17172b;
	}

	/* === Overlay === */
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s ease;
		z-index: 1000;
		border: 0px;
	}
	.overlay.active {
		opacity: 1;
		pointer-events: all;
	}

	.tree-btn {
		background: none;
		color: #f1f1f1;
		font-size: 1em;
		border: none;
		cursor: pointer;
		transition: color 0.2s ease;
	}
	.tree-btn:hover {
		color: #ff5555;
	}
	.count-input {
		width: 10%;
		text-align: center;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
		background-color: #262a33;
		color: white;

		padding: 1px;
		outline-width: 0px;
		border: 1px solid #797979;
		border-radius: 6px;
	}
	input[type='number'] {
		color-scheme: dark;
	}
	.no-planner-items {
		text-align: center;
		margin-top: 14rem;
		font-size: large;
	}
</style>
