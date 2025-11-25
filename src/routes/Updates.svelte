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
		><path
			d="M21.08 16.53A16.05 16.05 0 0 1 19 9.02C19 5.22 16.18 2 12 2a7 7 0 0 0-7 7c0 3.16-1.2 5.92-2.08 7.53A1 1 0 0 0 3.8 18h3.98c.13 2.23 1.97 4 4.22 4s4.09-1.77 4.22-4h3.98a1 1 0 0 0 .88-1.47ZM12 20c-1.16 0-2.1-.88-2.22-2h4.45a2.25 2.25 0 0 1-2.22 2Zm-6.59-4C6.24 14.14 7 11.71 7 9s2.24-5 5-5c2.96 0 5 2.23 5 5.02 0 2.71.76 5.13 1.59 6.98H5.41Z"
			fill="#FCF6FF"
		></path></svg
	></button
>

{#if isOpen}
	<div class="update-menu">
		<div class="update-content">
			<button class="close-btn" onclick={() => toggleMenu()}>×</button>
			<h4>Update <span><i>v 1.1</i></span></h4>
			<ul>
				<li>Planner now saves recipes selected</li>
				<li>Can now change count for planner items</li>
			</ul>
			<p><i>WIP</i></p>
			<ul>
				<li>Have a todo list for planner items</li>
				<li>Retractable planner list for better accessbility</li>
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
		z-index: 1001;
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
	}

	.close-btn:hover {
		color: #ff5555;
	}
	.update-content::-webkit-scrollbar {
		width: 1px;
	}
</style>
