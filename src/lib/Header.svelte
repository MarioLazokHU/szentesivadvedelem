<script>
	import { page } from '$app/state';
	import { foundation, navItems } from '$lib/site.js';

	let menuOpen = false;

	const isActive = (href) => {
		if (href.startsWith('/#')) {
			const hash = href.slice(1);
			return page.url.pathname === '/' && (page.url.hash === hash || (!page.url.hash && hash === '#kezdolap'));
		}

		return page.url.pathname.startsWith(href);
	};
</script>

<header class="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/92 shadow-lg shadow-zinc-950/20 backdrop-blur-xl">
	<div class="flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:px-12 2xl:px-16">
		<a href="/" class="flex min-w-0 items-center gap-3" aria-label="Kezdőlap">
			<img src="/logo.png" alt="{foundation.name} logó" class="h-14 w-14 rounded-xl bg-white object-contain p-1 shadow-md sm:h-16 sm:w-16" />
			<span class="hidden max-w-sm text-sm font-black uppercase leading-tight tracking-tight text-zinc-100 sm:block lg:text-base">
				{foundation.name}
			</span>
		</a>

		<nav class="hidden items-center gap-2 lg:flex" aria-label="Fő navigáció">
			{#each navItems as item}
				<a
					href={item.href}
					class={`rounded-lg px-4 py-2 text-sm font-bold transition ${isActive(item.href) ? 'bg-[#69a61e] text-white shadow-lg shadow-[#69a61e]/25' : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'}`}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<a href="/#tamogatas" class="hidden rounded-lg bg-[#69a61e] px-4 py-2 text-center text-xs font-black leading-snug text-white ring-1 ring-[#69a61e] xl:block">
			Számlaszám: {foundation.account}<br />Adó 1%: {foundation.tax}
		</a>

		<button
			type="button"
			class="rounded-lg bg-[#69a61e] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#69a61e]/25 lg:hidden"
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
		>
			Menü
		</button>
	</div>

	{#if menuOpen}
		<nav class="grid w-full grid-cols-2 gap-2 px-4 pb-4 sm:grid-cols-3 lg:hidden" aria-label="Mobil navigáció">
			{#each navItems as item}
				<a
					href={item.href}
					class={`rounded-lg px-4 py-3 text-center text-sm font-bold transition ${isActive(item.href) ? 'bg-[#69a61e] text-white' : 'bg-zinc-900 text-zinc-200'}`}
					onclick={() => (menuOpen = false)}
				>
					{item.label}
				</a>
			{/each}
		</nav>
	{/if}
	
</header>