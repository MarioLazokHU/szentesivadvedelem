<script>
	import { foundation, socialLinks } from '$lib/site.js';
</script>

<footer class="border-t border-white/40 bg-stone-950 text-white">
	<div class="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
		<div class="space-y-2 text-sm text-stone-200">
			<p class="font-black text-white">{foundation.name}</p>
			<p>Adószám: {foundation.tax}</p>
			<p class="font-black uppercase text-red-300">Ügyeleti idő: 0-24, tel.: 30/633-2900</p>
		</div>

		<div class="flex items-center gap-3">
			{#each socialLinks as link}
				<a href={link.href} target="_blank" rel="noreferrer" class="rounded-2xl bg-white/10 p-2 transition hover:bg-white/20" aria-label={link.label}>
					<img src={link.icon} alt={link.label} class="h-8 w-8 object-contain" />
				</a>
			{/each}
		</div>
	</div>
</footer>