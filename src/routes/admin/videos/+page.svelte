<script lang="ts">
  import { invalidateAll } from '$app/navigation';

  type AdminVideo = {
    id: string;
    url: string;
    description: string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  let { data } = $props<{ data: { videos: AdminVideo[] } }>();
  let videos = $state<AdminVideo[]>([]);
  let newUrl = $state('');
  let newDescription = $state('');
  let creating = $state(false);
  let savingId = $state<string | null>(null);
  let deletingId = $state<string | null>(null);
  let successMessage = $state('');
  let errorMessage = $state('');

  $effect(() => {
    videos = [...data.videos].sort((a, b) => getTime(b.createdAt) - getTime(a.createdAt));
  });

  function getTime(value?: Date | string | null) {
    return value ? new Date(value).getTime() : 0;
  }

  function formatDate(value?: Date | string | null) {
    if (!value) return 'Nincs dátum';
    return new Intl.DateTimeFormat('hu-HU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(value));
  }

  function clearMessages() {
    successMessage = '';
    errorMessage = '';
  }

  function getYouTubeVideoId(value: string) {
    try {
      const url = new URL(value.trim());
      const host = url.hostname.toLowerCase();
      if (host === 'youtu.be') {
        return url.pathname.slice(1);
      }
      if (host === 'www.youtube.com' || host === 'youtube.com') {
        return url.searchParams.get('v');
      }
      return null;
    } catch {
      return null;
    }
  }

  function getYouTubeThumbnail(value: string) {
    const id = getYouTubeVideoId(value);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  }

  function isValidUrl(value: string) {
    try {
      new URL(value.trim());
      return true;
    } catch {
      return false;
    }
  }

  async function createVideo(event: SubmitEvent) {
    event.preventDefault();
    clearMessages();
    creating = true;

    try {
      if (!newUrl.trim()) {
        throw new Error('A videó link megadása kötelező.');
      }

      if (!isValidUrl(newUrl)) {
        throw new Error('Érvényes videó linket fogadunk el.');
      }

      const response = await fetch('/admin/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newUrl, description: newDescription })
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const newVideo = await response.json();
      videos = [newVideo, ...videos].sort((a, b) => getTime(b.createdAt) - getTime(a.createdAt));
      newUrl = '';
      newDescription = '';
      successMessage = 'A videó link sikeresen hozzáadva.';
      await invalidateAll();
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Nem sikerült hozzáadni a videó linket.';
    } finally {
      creating = false;
    }
  }

  async function updateVideo(video: AdminVideo) {
    clearMessages();
    savingId = video.id;

    try {
      if (!isValidUrl(video.url)) {
        throw new Error('Érvényes videó linket fogadunk el.');
      }

      const response = await fetch('/admin/api/videos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: video.id, url: video.url, description: video.description })
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const updatedVideo = await response.json();
      videos = videos.map((item) => (item.id === updatedVideo.id ? updatedVideo : item));
      successMessage = 'A videó link sikeresen frissítve.';
      await invalidateAll();
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Nem sikerült frissíteni a videó linket.';
    } finally {
      savingId = null;
    }
  }

  async function deleteVideo(video: AdminVideo) {
    if (!confirm('Biztosan törlöd ezt a videó linket?')) return;

    clearMessages();
    deletingId = video.id;

    try {
      const response = await fetch('/admin/api/videos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: video.id })
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      videos = videos.filter((item) => item.id !== video.id);
      successMessage = 'A videó link törölve.';
      await invalidateAll();
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Nem sikerült törölni a videó linket.';
    } finally {
      deletingId = null;
    }
  }

  let activeVideoUrl = $state<string | null>(null);

  function openPreview(url: string) {
    const id = getYouTubeVideoId(url);
    if (id) {
      activeVideoUrl = `https://youtube-nocookie.com{id}?autoplay=1`;
    } else {
      alert('Ez a link nem egy érvényes YouTube videó, így nem lehet helyben lejátszani.');
    }
  }

  function closePreview() {
    activeVideoUrl = null;
  }
</script>

<svelte:head>
  <title>Admin | Videók</title>
</svelte:head>

<main class="min-h-screen overflow-x-hidden bg-zinc-950 px-3 py-8 text-zinc-100 sm:px-6 lg:px-8">
  <section class="w-full space-y-8 overflow-x-hidden">
    <div class="flex flex-col justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl shadow-black/20 sm:p-8 lg:flex-row lg:items-end">
      <div>
        <p class="text-sm font-black uppercase tracking-[0.3em] text-green-400">Admin</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Videó linkek kezelése</h1>
        <p class="mt-4 max-w-2xl text-zinc-400">Videó URL-eket adhatsz hozzá, szerkeszthetsz és törölchesz.</p>
      </div>
      <div class="rounded-xl bg-[#69a61e] px-5 py-4 text-center text-white">
        <p class="text-3xl font-black">{videos.length}</p>
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-green-100">link</p>
      </div>
    </div>

    {#if successMessage}
      <div class="rounded-xl bg-green-950 p-4 font-bold text-green-200 ring-1 ring-green-700">{successMessage}</div>
    {/if}

    {#if errorMessage}
      <div class="rounded-xl bg-red-950 p-4 font-bold text-red-200 ring-1 ring-red-800">{errorMessage}</div>
    {/if}

    <form onsubmit={createVideo} class="grid min-w-0 max-w-full gap-5 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl shadow-black/20 sm:p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
      <div class="grid gap-4">
        <label class="grid gap-2">
          <span class="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Videó link</span>
          <input bind:value={newUrl} type="url" class="block w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 font-semibold text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-green-500" placeholder="https://..." required />
        </label>

        <label class="grid gap-2">
          <span class="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Leírás</span>
          <input bind:value={newDescription} type="text" class="block w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 font-semibold text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-green-500" placeholder="Videó leírása" />
        </label>
      </div>

      <button type="submit" class="w-full min-w-0 rounded-lg bg-[#69a61e] px-6 py-4 font-black text-white shadow-lg shadow-[#69a61e]/25 transition hover:-translate-y-0.5 hover:bg-[#558819] disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto" disabled={creating}>
        {creating ? 'Mentés...' : 'Új videó link hozzáadása'}
      </button>
    </form>

    <div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl shadow-black/20">
      <p class="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Már meglévő videó linkek</p>
    </div>

    {#if videos.length === 0}
      <div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center shadow-xl shadow-black/20">
        <p class="text-xl font-black">Még nincs videó link.</p>
        <p class="mt-2 text-zinc-400">Az első videó linket a fenti űrlappal adhatod hozzá.</p>
      </div>
    {:else}
      <div class="divide-y divide-zinc-800 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl shadow-black/20">
        {#each videos as video (video.id)}
          <article class="grid min-w-0 gap-4 p-4 sm:p-6 lg:grid-cols-[1.2fr_1fr_180px] lg:items-center">
            <div class="grid gap-4">
              <div class="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
                {#if getYouTubeThumbnail(video.url)}
                  <img src={getYouTubeThumbnail(video.url)} alt="Videó előnézet" class="h-52 w-full object-cover sm:h-40" />
                {:else}
                  <div class="flex h-52 items-center justify-center text-zinc-500 sm:h-40">Előnézet nem elérhető</div>
                {/if}
              </div>

              <label class="grid gap-2">
                <span class="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 lg:hidden">URL</span>
                <input bind:value={video.url} type="url" class="block w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 font-semibold text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-green-500" />
              </label>

              <label class="grid gap-2">
                <span class="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 lg:hidden">Leírás</span>
                <input bind:value={video.description} type="text" class="block w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 font-semibold text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-green-500" />
              </label>
            </div>

            <div class="min-w-0 space-y-2">
              <p class="text-sm font-semibold text-zinc-300">Létrehozva: {formatDate(video.createdAt)}</p>
              <p class="text-sm font-semibold text-zinc-500">Frissítve: {formatDate(video.updatedAt)}</p>
            </div>

            <div class="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <button type="button" class="rounded-lg bg-[#69a61e] px-4 py-3 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#558819] disabled:cursor-not-allowed disabled:opacity-60" disabled={savingId === video.id || deletingId === video.id} onclick={() => updateVideo(video)}>
                {savingId === video.id ? 'Mentés...' : 'Mentés'}
              </button>
              <button type="button" class="rounded-lg bg-red-950 px-4 py-3 font-black text-red-200 ring-1 ring-red-800 transition hover:-translate-y-0.5 hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-60" disabled={savingId === video.id || deletingId === video.id} onclick={() => deleteVideo(video)}>
                {deletingId === video.id ? 'Törlés...' : 'Törlés'}
              </button>
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </section>
</main>
