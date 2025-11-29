<script>
	let isOpen = $state(false);
	function toggleMenu() {
		isOpen = !isOpen;
	}
</script>

<button
	aria-label="button"
	type="button"
	onclick={() => (isOpen = true)}
	onkeydown={() => (isOpen = true)}
	><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
		><g fill="#FFFFFF"
			><g
				><path
					d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM13.25 16H13v-5a1 1 0 0 0-1-1h-1c-.55 0-1 .45-1 1s.45 1 1 1v5a1 1 0 0 0 1 1h1.25c.55 0 1-.45 1-1s-.45-1-1-1Z"
				></path><circle cx="12" cy="7" r="1.25"></circle></g
			></g
		></svg
	></button
>

{#if isOpen}
	<div class="update-menu">
		<div class="update-content">
			<button class="close-btn" onclick={() => toggleMenu()}>×</button>
			<h4>
				Update <span><i>v 1.1.1</i></span><small style="font-size: x-small;"><i> 29-Nov</i></small>
			</h4>
			<ul>
				<li>
					Users can now report missing/incorrect recipes using the button <br /> at the bottom of the
					page.
				</li>
			</ul>
			<h4>
				Update <span><i>v 1.1</i></span><small style="font-size: x-small;"><i> 25-Nov</i></small>
			</h4>
			<ul>
				<li>Planner now saves recipes selected.</li>
				<li>Can now change count for planner items.</li>
			</ul>
			<p><i>WIP</i></p>
			<ul>
				<li>Have a todo list for planner items.</li>
				<li>Retractable planner list for better accessbility.</li>
			</ul>
			<p>For feedback and suggestions message <i>@notsoitchy</i> on Discord</p>
		</div>
	</div>
{/if}

<style>
	button {
		position: absolute;
		top: 1rem;
		background: transparent;
		border: none;
		border-radius: 0.5rem;
		border: none;
		z-index: 1001;
		transition: background 0.2s ease;
		cursor: pointer;
	}
	svg {
		height: 30px;
		display: block;
	}
	button:hover {
		background: hsl(222, 15%, 20%);
		cursor: pointer;
	}
	.update-menu {
		position: relative;
		max-height: 80vh;
	}
	.update-content {
		display: block;
		position: fixed;
		margin: auto;
		z-index: 999;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: hsl(222, 15%, 20%);
		box-shadow: 0px 0 12px rgba(0, 0, 0, 0.4);
		padding: 0.2rem 1rem;
		border-radius: 1rem;
		max-height: 80vh;
		overflow-y: auto;
	}

	.close-btn {
		position: fixed;
		color: #f1f1f1;
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
	.update-content::-webkit-scrollbar {
		width: 1px;
	}
</style>
