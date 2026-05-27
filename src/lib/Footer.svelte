<script>
	import { foundation, socialLinks } from '$lib/site.js';
</script>

<footer class="border-t border-zinc-800 bg-zinc-950/90 text-white">
	<div class="grid w-full gap-8 px-4 py-8 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-12 2xl:px-16">
		<div class="space-y-2 text-sm text-zinc-300">
			<p class="font-black text-white">{foundation.name}</p>
			<p>Adószám: {foundation.tax}</p>
			<p class="font-black uppercase text-[#68a61c]">Ügyeleti idő: 0-24, tel.: 30/633-2900</p>
		</div>

		<div class="flex items-center gap-3">
			{#each socialLinks as link}
				<a href={link.href} target="_blank" rel="noreferrer" class="rounded-lg bg-white/10 p-2 transition hover:bg-[#69a61e]/35" aria-label={link.label}>
					<img src={link.icon} alt={link.label} class="h-8 w-8 object-contain" />
				</a>
			{/each}
		</div>
	</div>
</footer>