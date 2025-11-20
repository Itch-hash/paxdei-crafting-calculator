<script>
	import TreeNode from './TreeNode.svelte';
	let { node, depth = 0 } = $props();

	const colors = [
		'#ffa726',
		'#90caf9',
		'#a5d6a7',
		'#CE93D8',
		'#BCAAA4',
		'#E0E0E0',
		'#FFCC80',
		'#81D4FA',
		'#C5E1A5',
		'#D1C4E9'
	];
	let color = $derived(colors[depth] || colors[colors.length - 1]);
	// $effect(() => console.log(child));
</script>

<li>
	<div class="tree-item">
		<img
			src={'https://gtcdn.info/paxdei/' + node.iconPath.replace('{height}', 64)}
			alt={node.name}
		/>
		<span style="color:{color}" class="ingredient">{node.name} (x{node.totalAmount})</span>
	</div>
	{#if node.subIngredients.length}
		{#each node.subIngredients as child}
			<ul style="padding-left: {0.5 * depth}rem">
				<TreeNode node={child} depth={depth + 1} />
			</ul>
		{/each}
	{/if}
</li>

<style>
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
</style>
