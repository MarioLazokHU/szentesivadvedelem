<script>
	import { foundation } from '$lib/site.js';

	const images = Array.from({ length: 72 }, (_, index) => `/galery/unnamed (${index + 1}).jpg`);
	let selected = 0;
	let modalOpen = false;

	function openImage(index) {
		selected = index;
		modalOpen = true;
	}

	function nextImage() {
		selected = (selected + 1) % images.length;
	}

	function previousImage() {
		selected = (selected - 1 + images.length) % images.length;
	}
</script>

<svelte:head>
	<title>{foundation.shortName} | Galéria</title>
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<div class="mb-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
		<div class="space-y-5">
			<p class="font-black uppercase tracking-[0.3em] text-stone-600">Pillanatok a mentésből</p>
			<h1 class="section-title text-stone-900">Galéria</h1>
			<p class="lead-text max-w-3xl text-stone-700">A korábbi oldal képei megtartva, modernebb, reszponzív mozaiknézetben és nagyítható megjelenítéssel.</p>
		</div>
		<div class="glass-card rounded-3xl p-5 text-center">
			<p class="text-4xl font-black text-stone-900">{images.length}</p>
			<p class="text-sm font-bold uppercase tracking-[0.2em] text-stone-600">fotó</p>
		</div>
	</div>

	<div class="glass-card mb-8 overflow-hidden rounded-4xl p-3 sm:p-5">
		<img src={images[selected]} alt="Kiemelt galériakép" class="h-[55vh] w-full rounded-3xl object-contain" />
		<div class="mt-4 flex items-center justify-between gap-3">
			<button type="button" class="rounded-full bg-stone-900 px-5 py-3 font-black text-white" onclick={previousImage}>Előző</button>
			<p class="text-sm font-bold text-stone-600">{selected + 1} / {images.length}</p>
			<button type="button" class="rounded-full bg-stone-900 px-5 py-3 font-black text-white" onclick={nextImage}>Következő</button>
		</div>
	</div>

	<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
		{#each images as image, index}
			<button type="button" class="group aspect-4/3 overflow-hidden rounded-3xl bg-white shadow-lg shadow-stone-900/10 ring-1 ring-white/60" onclick={() => openImage(index)}>
				<img src={image} alt={`Galériakép ${index + 1}`} class="h-full w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
			</button>
		{/each}
	</div>
</section>

{#if modalOpen}
	<div class="fixed inset-0 z-70 flex items-center justify-center bg-stone-950/90 p-4" role="dialog" aria-modal="true">
		<button type="button" class="absolute right-4 top-4 rounded-full bg-white px-5 py-3 font-black text-stone-900" onclick={() => (modalOpen = false)}>Bezárás</button>
		<button type="button" class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-5 py-4 text-3xl font-black text-stone-900" onclick={previousImage}>‹</button>
		<img src={images[selected]} alt={`Nagyított galériakép ${selected + 1}`} class="max-h-[86vh] max-w-[88vw] rounded-3xl object-contain shadow-2xl" />
		<button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-5 py-4 text-3xl font-black text-stone-900" onclick={nextImage}>›</button>
	</div>
{/if}