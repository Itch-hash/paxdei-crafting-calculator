<script>
	import MaterialBreakdown from './MaterialBreakdown.svelte';
	let { node, depth = 0 } = $props();
	let rawMats = $state([]);
	function findLeaf(node) {
		let result = [];
		for (let item of node) {
			if (item.ingredients.length > 0) {
				result.push(...findLeaf(item.ingredients));
			} else {
				result.push(item);
			}
		}
		const sortedDup = result.reduce((acc, item, i) => {
			if (!acc[item.id]) {
				acc[item.id] = { ...item };
			} else {
				acc[item.id].totalAmount += item.totalAmount;
			}
			return acc;
		}, {});
		return Object.values(sortedDup);
	}
	$effect(() => (rawMats = findLeaf(node)));
	$inspect(rawMats);
</script>

<h3>Total Raw Materials</h3>
<div class="card-container">
	{#each rawMats as rawMat}
		<div class="card">
			<img
				src={'https://gtcdn.info/paxdei/' +
					rawMat.iconPath.replace('{height}', 64) +
					'?1764356679632'}
				alt={rawMat.name}
			/>

			<p class="name">{rawMat.name}</p>
			<p class="amount">x {rawMat.totalAmount.toFixed(1)}</p>
		</div>
	{/each}
</div>

<style>
	.card-container {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		cursor: context-menu;
	}

	.card {
		width: 100px; /* smaller width */
		padding: 6px 8px; /* tighter padding */
		background: #1e1e24;
		border: 1px solid #2b2b33;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
		transition:
			transform 0.1s ease,
			box-shadow 0.1s ease;
	}

	.card:hover {
		transform: scale(1.04);
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.35);
	}

	.card img {
		width: 36px; /* smaller icon */
		height: 36px;
		object-fit: contain;
		margin-bottom: 4px;
	}

	.name {
		margin: 0;
		font-size: 0.75rem; /* smaller text */
		font-weight: 600;
		color: #f0f0f5;
		line-height: 1.1;
	}

	.amount {
		margin: 2px 0 0;
		font-size: 0.7rem; /* smaller text */
		color: #c6c6d0;
	}
</style>
