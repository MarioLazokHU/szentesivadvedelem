<script lang="ts">
  export let data: { adminAuthed: boolean };
</script>

<svelte:head>
  <title>Admin felület</title>
</svelte:head>

<main class="min-h-screen overflow-x-hidden bg-zinc-950 px-3 py-8 text-zinc-100 sm:px-6 lg:px-8">
  <section class="mx-auto max-w-6xl space-y-10">
    <div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl shadow-black/20">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-sm font-black uppercase tracking-[0.3em] text-green-400">Admin</p>
          <h1 class="mt-4 text-5xl font-black tracking-tight sm:text-6xl">Admin felület</h1>
          <p class="mt-4 max-w-3xl text-zinc-400">Blogokat, képeket és videó linkeket kezelhetsz ezen az oldalon. Válassz egy területet a szerkesztéshez.</p>
        </div>
        {#if data.adminAuthed}
          <a href="/admin/logout" class="inline-flex items-center rounded-2xl border border-red-700 bg-red-950 px-5 py-3 text-sm font-black uppercase tracking-[0.15em] text-red-200 transition hover:bg-red-900">Kijelentkezés</a>
        {/if}
      </div>
    </div>

    <div class="grid gap-6 sm:grid-cols-3">
      <a href="/admin/blogs" class="group rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-left transition hover:border-green-500 hover:bg-zinc-950">
        <p class="text-sm font-black uppercase tracking-[0.3em] text-green-400">Blog</p>
        <h2 class="mt-4 text-2xl font-black">Blogbejegyzések</h2>
        <p class="mt-3 text-zinc-400">Létrehozhatsz új blogbejegyzéseket, szerkeszthetsz meglévőket és törölheted őket.</p>
      </a>

      <a href="/admin/images" class="group rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-left transition hover:border-green-500 hover:bg-zinc-950">
        <p class="text-sm font-black uppercase tracking-[0.3em] text-green-400">Képek</p>
        <h2 class="mt-4 text-2xl font-black">Galéria kezelése</h2>
        <p class="mt-3 text-zinc-400">Feltölthetsz új képeket, frissítheted a leírásokat és törölheted a nem kívánt fájlokat.</p>
      </a>

      <a href="/admin/videos" class="group rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-left transition hover:border-green-500 hover:bg-zinc-950">
        <p class="text-sm font-black uppercase tracking-[0.3em] text-green-400">Videók</p>
        <h2 class="mt-4 text-2xl font-black">Videó linkek</h2>
        <p class="mt-3 text-zinc-400">Videó URL-eket adhatsz hozzá, szerkesztheted a meglévő linkeket és törölheted azokat.</p>
      </a>
    </div>
  </section>
</main>
