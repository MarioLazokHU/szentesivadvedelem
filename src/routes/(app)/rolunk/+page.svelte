<script>
	import { aboutSections, foundation } from '$lib/site.js';
</script>

<svelte:head>
	<title>{foundation.shortName} | Rólunk</title>
</svelte:head>

<section class="w-full px-4 py-14 sm:px-8 lg:px-12 lg:py-20 2xl:px-16">
	<div class="mb-12 w-full space-y-5">
		<p class="font-black uppercase tracking-[0.3em] text-[#68a61c]">Kik vagyunk</p>
		<h1 class="section-title text-stone-900">Rólunk</h1>
		<p class="lead-text text-stone-700">Mentés, gondozás, gyógyítás, oktatás és közösségi összefogás a természetben élő vagy bajba jutott állatokért.</p>
	</div>

	<div class="space-y-8">
		{#each aboutSections as section, index}
			<article class={`glass-card flex flex-col items-center gap-8 rounded-2xl p-6 sm:p-8 lg:flex-row lg:gap-12 lg:p-10 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
				<div class="w-full lg:w-2/5">
					<div class="relative mx-auto aspect-square max-w-sm overflow-hidden rounded-xl bg-zinc-100 shadow-2xl shadow-zinc-900/10">
						<img src={section.image} alt={section.title} class="h-full w-full object-cover transition duration-500 hover:scale-105" />
					</div>
				</div>
				<div class="w-full space-y-4 lg:w-3/5">
					<span class="inline-flex rounded-lg bg-[#69a61e] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white">{String(index + 1).padStart(2, '0')}</span>
					<h2 class="text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">{section.title}</h2>
					<p class="text-justify leading-8 text-stone-700">{section.text}</p>
				</div>
			</article>
		{/each}
	</div>
</section>