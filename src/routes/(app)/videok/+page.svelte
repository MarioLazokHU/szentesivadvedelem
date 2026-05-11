<script>
	import { foundation } from '$lib/site.js';
</script>

<svelte:head>
	<title>{foundation.shortName} | Videók</title>
</svelte:head>

<section class="flex w-full items-center px-4 py-20 sm:px-8 lg:min-h-[70vh] lg:px-12 2xl:px-16">
	<div class="glass-card w-full overflow-hidden rounded-2xl">
		<div class="earth-gradient p-8 text-white sm:p-12">
			<p class="font-black uppercase tracking-[0.3em] text-white/70">Videótár</p>
			<h1 class="mt-4 text-5xl font-black tracking-tight sm:text-7xl">Videók</h1>
		</div>
		<div class="p-8 sm:p-12">
			<p class="lead-text text-stone-700">A videók egyenlőre nem elérhetőek</p>
			<div class="mt-8 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
				<p class="text-lg font-black text-stone-900">Hamarosan új tartalmakkal bővül.</p>
				<p class="mt-2 text-stone-600">Addig is kövess minket közösségi oldalainkon.</p>
			</div>
		</div>
	</div>
</section>