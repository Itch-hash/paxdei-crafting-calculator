<script>
	/** @type {import('./$types').LayoutProps} */
	import favicon from '$lib/assets/favicon.png';
	import mixpanel from 'mixpanel-browser';

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

	// Create an instance of the Mixpanel object, your token is already added to this snippet
	mixpanel.init('0de81db040a4d0b62f96958051433d96', {
		autocapture: true,
		track_pageview: true,
		persistence: 'localStorage',
		record_sessions_percent: 100,
		api_host: 'https://api-eu.mixpanel.com',
		record_mask_text_selector: '',
		record_block_selector: ''
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
	<p>Pax Dei Crafting Calculator &copy; 2025</p>
	<p>Made with ❤️ by notsoitchy</p>
	<p>
		You can support me by buying me a cup of coffee ☕ <a
			href="https://buymeacoffee.com/heshamfekry"
			target="_blank"
			rel="noopener noreferrer">here</a
		>
	</p>
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
	footer p a {
		text-decoration: none;
	}
</style>
