<script>
	let isOpen = $state(false);
	function toggleMenu() {
		isOpen = !isOpen;
	}

	let showBlip = $state(false);

	const currentVersion = '1.2.1';

	$effect(() => {
		const lastSeenVersion = localStorage.getItem('lastSeenVersion');
		if (currentVersion != lastSeenVersion) {
			showBlip = true;
		} else showBlip = false;
	});

	function openPanel() {
		localStorage.setItem('lastSeenVersion', currentVersion);
		isOpen = true;
		showBlip = false;
	}
</script>

<button aria-label="button" type="button" onclick={() => openPanel()} onkeydown={() => openPanel()}
	><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
		><g fill="#FFFFFF"
			><g
				><path
					d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM13.25 16H13v-5a1 1 0 0 0-1-1h-1c-.55 0-1 .45-1 1s.45 1 1 1v5a1 1 0 0 0 1 1h1.25c.55 0 1-.45 1-1s-.45-1-1-1Z"
				></path><circle cx="12" cy="7" r="1.25"></circle></g
			></g
		></svg
	>{#if showBlip}
		<span class="blip"></span>
	{/if}</button
>

{#if isOpen}
	<div class="update-menu">
		<div class="update-content">
			<button class="close-btn" onclick={() => toggleMenu()}>×</button>
			<h4>
				Update <span><i>v 1.2</i></span><small style="font-size: x-small;"
					><i> 07-Dec</i>
					<span style="color:gold">New</span></small
				>
			</h4>
			<ul>
				<li>
					Total Raw Materials are calculated and added to the top when items are added to the
					Planner.
				</li>
				<li>
					Renamed Crafting menu from <s>Crafting Tree</s> to Planner for convenience.
				</li>
			</ul>
			<h4>
				Update <span><i>v 1.1.1</i></span><small style="font-size: x-small;"><i> 29-Nov</i></small>
			</h4>
			<ul>
				<li>
					Users can report missing/incorrect recipes using the button <br /> at the bottom of the page.
				</li>
			</ul>
			<h4>
				Update <span><i>v 1.1</i></span><small style="font-size: x-small;"><i> 25-Nov</i></small>
			</h4>
			<ul>
				<li>Planner saves recipes selected.</li>
				<li>Can change count for planner items.</li>
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
	.blip {
		position: absolute;
		top: -4px;
		right: -4px;
		width: 10px;
		height: 10px;
		background-color: #ff3b30;
		border-radius: 50%;
		box-shadow: 0 0 6px rgba(255, 59, 48, 0.6);
		border: 2px solid hsl(222, 15%, 20%);
		pointer-events: none;
		animation: blip-pulse 1.4s infinite;
	}
	@keyframes blip-pulse {
		0% {
			transform: scale(0.9);
		}
		50% {
			transform: scale(1.15);
		}
		100% {
			transform: scale(0.9);
		}
	}
</style>
