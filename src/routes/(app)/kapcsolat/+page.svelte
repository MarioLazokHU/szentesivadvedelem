<script>
	import { foundation, socialLinks } from '$lib/site.js';

	const openingHours = [
		'Hétfő 10:00–17:00',
		'Kedd 10:00–17:00',
		'Szerda 10:00–17:00',
		'Csütörtök 10:00–17:00',
		'Péntek 10:00–17:00',
		'Szombat 10:00–12:00',
		'Vasárnap 10:00–12:00'
	];
</script>

<svelte:head>
	<title>{foundation.shortName} | Kapcsolat</title>
</svelte:head>

<section class="w-full px-4 py-14 sm:px-8 lg:px-12 lg:py-20 2xl:px-16">
	<div class="mb-10 space-y-5">
		<p class="font-black uppercase tracking-[0.3em] text-green-700">Elérhetőségek</p>
		<h1 class="section-title text-stone-900">Kapcsolat</h1>
		<p class="lead-text text-stone-700">Ha bajba jutott állatot találtál, hívd az ügyeleti számot. 0-24 órás ügyelet!</p>
	</div>

	<div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
		<div class="glass-card rounded-2xl p-6 sm:p-8">
			<div class="space-y-6">
				<div>
					<p class="text-sm font-black uppercase tracking-[0.25em] text-stone-600">Cím</p>
					<p class="mt-2 text-xl font-black text-stone-900">{foundation.address}</p>
				</div>
				<div>
					<p class="text-sm font-black uppercase tracking-[0.25em] text-stone-600">Mobil</p>
					<a href="tel:+36306332900" class="mt-2 block text-xl font-black text-green-700">{foundation.phone}</a>
				</div>
				<div>
					<p class="text-sm font-black uppercase tracking-[0.25em] text-stone-600">E-mail</p>
					<a href={`mailto:${foundation.email}`} class="mt-2 block text-xl font-black text-stone-900">{foundation.email}</a>
				</div>
				<div>
					<p class="text-sm font-black uppercase tracking-[0.25em] text-stone-600">Nyitvatartás</p>
					<div class="mt-3 grid gap-2">
						{#each openingHours as row}
							<p class="rounded-lg bg-zinc-100 px-4 py-3 font-semibold text-stone-700">{row}</p>
						{/each}
					</div>
				</div>
				<div class="rounded-xl bg-green-50 p-5 text-center text-xl font-black uppercase text-green-800 ring-1 ring-green-200">0-24 órás ügyelet!</div>
			</div>
		</div>

		<div class="space-y-8">
			<div class="glass-card overflow-hidden rounded-2xl p-4">
				<img src="/map.png" alt="Térkép" class="h-full max-h-130 w-full rounded-xl object-cover shadow-lg shadow-stone-900/10" />
			</div>

			<div class="glass-card rounded-2xl p-6 sm:p-8">
				<h2 class="text-3xl font-black tracking-tight text-stone-900">Közösségi Média</h2>
				<div class="mt-5 flex flex-wrap gap-4">
					{#each socialLinks as link}
						<a href={link.href} target="_blank" rel="noreferrer" class="flex items-center gap-3 rounded-lg bg-zinc-100 px-5 py-4 font-black text-stone-900 shadow-sm transition hover:-translate-y-1 hover:bg-green-50">
							<img src={link.icon} alt={link.label} class="h-10 w-10 object-contain" />
							{link.label}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>