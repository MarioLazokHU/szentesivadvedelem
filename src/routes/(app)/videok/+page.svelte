<script lang="ts">
	import { foundation } from '$lib/site.js';

	export let data: {
		videos: {
			id: string;
			url: string;
			description: string;
			createdAt: string;
		}[];
	};

	// YouTube ID kinyerése
	function getYouTubeId(url: string) {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : null;
	}
</script>

<svelte:head>
	<title>{foundation.shortName} | Videók</title>
</svelte:head>

<section class="flex w-full items-center px-4 py-20 sm:px-8 lg:min-h-[70vh] lg:px-12 2xl:px-16">
	<div class="glass-card w-full overflow-hidden rounded-2xl bg-zinc-50/50 shadow-2xl">
		<!-- Fejléc -->
		<div class="earth-gradient p-8 text-white sm:p-12">
			<p class="font-black uppercase tracking-[0.3em] text-white/70">Videótár</p>
			<h1 class="mt-4 text-5xl font-black tracking-tight sm:text-7xl">Videók</h1>
		</div>

		<div class="p-8 sm:p-12">
			{#if data.videos && data.videos.length > 0}
				<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each data.videos as video}
						{@const videoId = getYouTubeId(video.url)}
						<div class="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
							
							<!-- Előnézeti kép (Thumbnail) -->
							<a href={video.url} target="_blank" class="relative aspect-video w-full overflow-hidden bg-zinc-900">
								{#if videoId}
									<!-- A 0.jpg a YouTube alapértelmezett, teljes méretű borítóképe -->
									<img
										src="https://img.youtube.com/vi/{videoId}/0.jpg"
										alt={video.description}
										class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<!-- Play ikon overlay -->
									<div class="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/30">
										<div class="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-green-700 shadow-xl transition-transform group-hover:scale-110">
											<svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8">
												<path fill-rule="evenodd" d="M4.5 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" clip-rule="evenodd" />
											</svg>
										</div>
									</div>
								{:else}
									<div class="flex h-full items-center justify-center text-zinc-500">
										<span>Hibás videó link</span>
									</div>
								{/if}
							</a>

							<!-- Leírás -->
							<div class="p-6">
								<h3 class="line-clamp-2 text-lg font-bold text-zinc-800">
									{video.description}
								</h3>
								<div class="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 text-xs text-zinc-500 uppercase">
									<span>{new Date(video.createdAt).toLocaleDateString('hu-HU')}</span>
									<span class="font-bold text-green-600">YouTube megnyitása</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="rounded-2xl border-2 border-dashed border-zinc-200 p-20 text-center">
					<p class="text-xl font-medium text-zinc-600">Még nincs hozzáadott videó.</p>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.earth-gradient {
		background: linear-gradient(135deg, #166534 0%, #15803d 100%);
	}
	.glass-card {
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
	}
</style>
