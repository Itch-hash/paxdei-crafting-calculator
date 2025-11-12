<script>
	/** @type {import('./$types').LayoutProps} */
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	import { onMount } from 'svelte';

	onMount(() => {
		window.gtTooltipConfig = {
			scale: 0.8,
			delay: 50
		};

		const script = document.createElement('script');
		script.src = 'https://paxdei.gaming.tools/embed.js';
		script.async = true;
		document.body.appendChild(script);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<header>
	<h1>Pax Dei Crafting Calculator</h1>
</header>

{@render children?.()}

<footer>
	<p>Crafting Calculator &copy; 2025</p>
</footer>

<style>
	header {
		text-align: center;
		margin-bottom: 30px;
	}
	header h1 {
		font-size: 2rem;
		color: #8aa9ff;
	}
	footer {
		text-align: center;
		margin-top: 30px;
		color: #8aa9ff;
	}
</style>
