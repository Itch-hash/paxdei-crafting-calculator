<script>
	let { selectedRecipeProp } = $props();
</script>

<section class="effects-section">
	<h2>Item Effects</h2>
	<ul id="effectsList"></ul>
	<div class="skill-section">
		<div class="skill-info">
			<p><span>Skill:</span> <span></span></p>
			<p><span>Skill Difficulty:</span> <span></span></p>
			<p><span>Skill Cap:</span> <span></span></p>
			<p>
				<span>Minimum Skill to Unlock:</span>
				<span> </span>
			</p>

			<p>
				<span>XP Multiplier:</span>
				<span></span>
			</p>
		</div>
	</div>
</section>

<style>
	.effects-section {
		background: #262a33;
		padding: 15px;
		margin-top: 20px;
		border-radius: 10px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.effects-section h2 {
		color: #fff;
		border-bottom: 1px solid #4a4a88;
		padding-bottom: 5px;
		margin-top: 0;
	}
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
