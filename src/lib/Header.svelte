<script>
	import { page } from '$app/state';
	import { foundation, navItems } from '$lib/site.js';

	let menuOpen = false;

	const isActive = (href) => (href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href));
</script>

<header class="sticky top-0 z-50 border-b border-white/40 bg-[#f6f2ea]/85 shadow-lg shadow-stone-900/5 backdrop-blur-xl">
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
		<a href="/" class="flex min-w-0 items-center gap-3" aria-label="Kezdőlap">
			<img src="/logo.png" alt="{foundation.name} logó" class="h-14 w-14 rounded-full object-contain shadow-md sm:h-16 sm:w-16" />
			<span class="hidden max-w-sm text-sm font-black uppercase leading-tight tracking-tight text-stone-800 sm:block lg:text-base">
				{foundation.name}
			</span>
		</a>

		<nav class="hidden items-center gap-2 lg:flex" aria-label="Fő navigáció">
			{#each navItems as item}
				<a
					href={item.href}
					class={`rounded-full px-4 py-2 text-sm font-bold transition ${isActive(item.href) ? 'bg-stone-800 text-white shadow-lg shadow-stone-900/20' : 'text-stone-700 hover:bg-white/80 hover:text-stone-950'}`}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<a href="/tamogatas" class="hidden rounded-2xl bg-red-50 px-4 py-2 text-center text-xs font-black leading-snug text-red-800 ring-1 ring-red-200 xl:block">
			Számlaszám: {foundation.account}<br />Adó 1%: {foundation.tax}
		</a>

		<button
			type="button"
			class="rounded-2xl bg-stone-800 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-stone-900/20 lg:hidden"
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
		>
			Menü
		</button>
	</div>

	{#if menuOpen}
		<nav class="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-4 pb-4 sm:grid-cols-3 lg:hidden" aria-label="Mobil navigáció">
			{#each navItems as item}
				<a
					href={item.href}
					class={`rounded-2xl px-4 py-3 text-center text-sm font-bold transition ${isActive(item.href) ? 'bg-stone-800 text-white' : 'bg-white/75 text-stone-800'}`}
					onclick={() => (menuOpen = false)}
				>
					{item.label}
				</a>
			{/each}
		</nav>
	{/if}
</header>