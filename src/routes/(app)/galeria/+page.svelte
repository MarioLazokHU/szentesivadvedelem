<script lang="ts">
	import { foundation } from '$lib/site.js';

	type AdminImage = {
		id: string;
		description?: string | null;
		createdAt?: Date | string | null;
		updatedAt?: Date | string | null;
	};

	let { data } = $props<{ data: { images: AdminImage[] } }>();

	let images = $state<AdminImage[]>([]);
	let selected = $state(0);
	let modalOpen = $state(false);

	$effect(() => {
		images = data.images ?? [];
	});

	$effect(() => {
		if (selected >= images.length) {
			selected = Math.max(0, images.length - 1);
		}
	});

	function openImage(index: number) {
		selected = index;
		modalOpen = true;
	}

	function nextImage() {
		if (images.length === 0) return;
		selected = (selected + 1) % images.length;
	}

	function previousImage() {
		if (images.length === 0) return;
		selected = (selected - 1 + images.length) % images.length;
	}
</script>

<svelte:head>
	<title>{foundation.shortName} | Galéria</title>
</svelte:head>

<section class="w-full px-4 py-14 sm:px-8 lg:px-12 lg:py-20 2xl:px-16">
	<div class="mb-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
		<div class="space-y-5">
			<p class="font-black uppercase tracking-[0.3em] text-[#68a61c]">
				Pillanatok a mentésből
			</p>

			<h1 class="section-title text-stone-900">Galéria</h1>
		</div>

		<div class="glass-card rounded-xl border-l-4 border-[#69a61e] p-5 text-center">
			<p class="text-4xl font-black text-stone-900">{images.length}</p>

			<p class="text-sm font-bold uppercase tracking-[0.2em] text-stone-600">
				fotó
			</p>
		</div>
	</div>

	{#if images.length === 0}
		<div class="glass-card rounded-2xl p-8 text-center text-stone-700">
			<p class="text-xl font-black">Még nincs feltöltött galériakép.</p>

			<p class="mt-3 text-sm text-stone-600">
				A galériába feltöltött képek itt fognak megjelenni.
			</p>
		</div>
	{:else}
		<div class="glass-card mb-8 overflow-hidden rounded-2xl p-3 sm:p-5">
			<img
				src={`/api/images/${images[selected].id}`}
				alt={images[selected].description ?? 'Kiemelt galériakép'}
				class="h-[55vh] w-full rounded-xl object-contain"
			/>

			<div class="mt-4 flex items-center justify-between gap-3">
				<button
					type="button"
					class="rounded-lg bg-zinc-950 px-5 py-3 font-black text-white"
					on:click={previousImage}
				>
					Előző
				</button>

				<p class="text-sm font-bold text-stone-600">
					{selected + 1} / {images.length}
				</p>

				<button
					type="button"
					class="rounded-lg bg-[#69a61e] px-5 py-3 font-black text-white hover:bg-[#558819]"
					on:click={nextImage}
				>
					Következő
				</button>
			</div>
		</div>

		<div
			class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
		>
			{#each images as image, index}
				<button
					type="button"
					class="group aspect-4/3 overflow-hidden rounded-xl bg-white shadow-lg shadow-stone-900/10 ring-1 ring-zinc-200"
					on:click={() => openImage(index)}
				>
					<img
						src={`/api/images/${image.id}`}
						alt={image.description ?? `Galériakép ${index + 1}`}
						class="h-full w-full object-cover transition duration-500 group-hover:scale-110"
						loading="lazy"
					/>
				</button>
			{/each}
		</div>
	{/if}
</section>

{#if modalOpen}
	<div
		class="fixed inset-0 z-70 flex items-center justify-center bg-stone-950/90 p-4"
		role="dialog"
		aria-modal="true"
	>
		<button
			type="button"
			class="absolute right-4 top-4 rounded-lg bg-white px-5 py-3 font-black text-stone-900"
			on:click={() => (modalOpen = false)}
		>
			Bezárás
		</button>

		<button
			type="button"
			class="absolute left-4 top-1/2 -translate-y-1/2 rounded-lg bg-white/90 px-5 py-4 text-3xl font-black text-stone-900"
			on:click={previousImage}
		>
			‹
		</button>

		<img
			src={`/api/images/${images[selected].id}`}
			alt={`Nagyított galériakép ${selected + 1}`}
			class="max-h-[86vh] max-w-[88vw] rounded-xl object-contain shadow-2xl"
		/>

		<button
			type="button"
			class="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-white/90 px-5 py-4 text-3xl font-black text-stone-900"
			on:click={nextImage}
		>
			›
		</button>
	</div>
{/if}