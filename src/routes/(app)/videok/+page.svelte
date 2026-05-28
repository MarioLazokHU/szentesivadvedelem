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
	function getVideoSource(value: string) {
		return value.match(/<iframe[^>]+src=["']([^"']+)["']/i)?.[1] ?? value;
	}

		function isIframeEmbed(value: string) {
			return /<iframe[\s\S]*?>[\s\S]*?<\/iframe>|<iframe[\s\S]*?>/i.test(value);
		}

		function getEmbedNumber(value: string, attribute: 'width' | 'height') {
			const match = value.match(new RegExp(`${attribute}=["']?([0-9]+)`, 'i'));
			return match ? Number(match[1]) : null;
		}

		function isPortraitVideo(value: string) {
			const width = getEmbedNumber(value, 'width');
			const height = getEmbedNumber(value, 'height');

			return Boolean(width && height && height > width);
		}

	function getYouTubeId(value: string) {
		const url = getVideoSource(value);
		const regExp =
			/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);
		const id = match?.[2];
		return id && id.length === 11 ? id : null;
	}

	function isDirectVideoFile(value: string) {
		const url = getVideoSource(value);
		return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
	}

	function getEmbedUrl(value: string) {
		const url = getVideoSource(value);

		try {
			const parsed = new URL(url.trim());
			const host = parsed.hostname.toLowerCase();

			if (host === 'www.youtube.com' || host === 'youtube.com') {
				const id =
					parsed.searchParams.get('v') ||
					parsed.pathname.split('/').pop();

				return id
					? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
					: null;
			}

			if (host === 'youtu.be') {
				const id = parsed.pathname.slice(1);

				return id
					? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
					: null;
			}

			return url;
		} catch {
			return null;
		}
	}

	let playingVideoId: string | null = null;

	function playVideo(id: string) {
		playingVideoId = playingVideoId === id ? null : id;
	}

	function openFullScreen(id: string) {
		const card = document.getElementById(`video-card-${id}`);

		if (!card) return;

		if (card.requestFullscreen) {
			card.requestFullscreen();
		} else if ((card as any).webkitRequestFullscreen) {
			(card as any).webkitRequestFullscreen();
		} else if ((card as any).mozRequestFullScreen) {
			(card as any).mozRequestFullScreen();
		} else if ((card as any).msRequestFullscreen) {
			(card as any).msRequestFullscreen();
		}
	}
</script>

<svelte:head>
	<title>{foundation.shortName} | Videók</title>
</svelte:head>

<section
	class="flex w-full items-center px-4 py-20 sm:px-8 lg:min-h-[70vh] lg:px-12 2xl:px-16"
>
	<div
		class="glass-card w-full overflow-hidden rounded-2xl bg-zinc-50/50 shadow-2xl"
	>
		<!-- Fejléc -->
		<div class="earth-gradient p-8 text-white sm:p-12">
			<p class="font-black uppercase tracking-[0.3em] text-white/70">
				Videótár
			</p>

			<h1 class="mt-4 text-5xl font-black tracking-tight sm:text-7xl">
				Videók
			</h1>
		</div>

		<div class="p-8 sm:p-12">
				{#if data.videos && data.videos.length > 0}
					<div class="grid grid-cols-1 gap-8">
					{#each data.videos as video}
						{@const videoId = getYouTubeId(video.url)}
							{@const videoSource = getVideoSource(video.url)}
							{@const portraitVideo = isPortraitVideo(video.url)}

						<div
								class={`group grid overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl ${portraitVideo ? 'lg:grid-cols-[minmax(260px,420px)_1fr]' : 'lg:grid-cols-[minmax(320px,38vw)_1fr]'}`}
						>
							<div
								id={"video-card-" + video.id}
										class={`relative flex w-full items-center justify-center overflow-hidden bg-zinc-900 ${portraitVideo ? 'mx-auto aspect-9/16 max-h-[82vh] max-w-105' : 'min-h-[70vh] sm:min-h-140 lg:h-full lg:min-h-155'}`}
							>
									{#if isIframeEmbed(video.url)}
										<div class="video-embed h-full w-full">
											{@html video.url}
										</div>
									{:else if playingVideoId === video.id}
									{#if isDirectVideoFile(video.url)}
										<video
											controls
											autoplay
												class="h-full w-full bg-black object-contain"
										>
										<source src={videoSource} />

											Az Ön böngészője nem támogatja a videó
											lejátszást.
										</video>
									{:else if getEmbedUrl(video.url)}
										<iframe
											src={getEmbedUrl(video.url)}
											title={video.description}
												class="h-full w-full"
											allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
											allowfullscreen
											></iframe>
									{:else}
										<div
											class="flex h-full items-center justify-center bg-zinc-900 text-zinc-100"
										>
											<div class="px-6 text-center">
												<p class="text-sm font-semibold">
													A videó nem játszható le közvetlenül.
												</p>
											</div>
										</div>
									{/if}
								{:else}
									<a
										href={videoSource}
										target="_blank"
										class="block h-full w-full"
									>
										{#if videoId}
											<img
												src="https://img.youtube.com/vi/{videoId}/0.jpg"
												alt={video.description}
												class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
											/>
										{:else}
											<div
												class="flex h-full items-center justify-center bg-zinc-900 text-zinc-100"
											>
												<div class="text-center">
													<div class="mb-2 text-3xl">▶</div>

													<p class="text-sm font-semibold">
														Videó link
													</p>

													<p class="text-xs text-zinc-400">
														Nincs előnézet
													</p>
												</div>
											</div>
										{/if}
									</a>
								{/if}

									{#if !isIframeEmbed(video.url)}
										<!-- PLAY / PAUSE GOMB -->
										<button
											type="button"
											on:click={() => playVideo(video.id)}
											class={`absolute inset-0 z-10 flex items-center justify-center transition-all duration-300
									${
										playingVideoId === video.id
											? 'bg-black/0 hover:bg-black/10'
											: 'bg-black/10 hover:bg-black/30'
									}`}
											aria-label={playingVideoId === video.id
												? 'Szünet'
												: 'Lejátszás'}
										>
											<div
												class={`flex items-center justify-center rounded-full backdrop-blur-sm transition-all duration-300
										${
											playingVideoId === video.id
												? 'h-12 w-12 bg-white/10 text-white opacity-0 group-hover:opacity-100'
												: 'h-14 w-14 bg-white/70 text-[#68a61c] shadow-xl hover:scale-110'
										}`}
											>
												{#if playingVideoId === video.id}
													<!-- Pause ikon -->
													<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												class="h-6 w-6"
												>
													<path
													fill-rule="evenodd"
													d="M6.75 5.25A.75.75 0 017.5 6v12a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm9 0A.75.75 0 0116.5 6v12a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75z"
													clip-rule="evenodd"
													/>
												</svg>
												{:else}
													<!-- Play ikon -->
													<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												class="h-8 w-8"
												>
													<path
													fill-rule="evenodd"
													d="M4.5 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
													clip-rule="evenodd"
													/>
												</svg>
												{/if}
											</div>
										</button>

										<!-- FULLSCREEN GOMB -->
										{#if playingVideoId === video.id}
											<button
										type="button"
										on:click={() => openFullScreen(video.id)}
										class="absolute right-4 top-4 z-20 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white opacity-30 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:opacity-100"
											>
												Teljes képernyő
											</button>
										{/if}
								{/if}
							</div>

							<!-- Leírás -->
								<div class="flex flex-col justify-between gap-6 p-6 lg:p-8">
								<h3
										class="whitespace-pre-line text-base font-medium leading-8 text-zinc-700 lg:text-lg"
								>
									{video.description}
								</h3>

								<div
									class="mt-4 border-t border-zinc-100 pt-4 text-xs uppercase text-zinc-500"
								>
									<span>
										{new Date(video.createdAt).toLocaleDateString(
											'hu-HU'
										)}
									</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div
					class="rounded-2xl border-2 border-dashed border-zinc-200 p-20 text-center"
				>
					<p class="text-xl font-medium text-zinc-600">
						Még nincs hozzáadott videó.
					</p>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.earth-gradient {
		background: linear-gradient(135deg, #69a61e 0%, #69a61e 100%);
	}

	.glass-card {
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
	}

	/* fullscreen alatt szinte eltűnik */
	:fullscreen button {
		opacity: 0.03;
		transition: opacity 0.3s ease;
	}

	:fullscreen button:hover {
		opacity: 1;
	}

		:global(.video-embed) {
			display: flex;
			height: 100%;
			width: 100%;
			align-items: center;
			justify-content: center;
		}

		:global(.video-embed iframe) {
			height: 100%;
			max-height: 100%;
			max-width: 100%;
			width: 100%;
			border: 0;
		}
</style>