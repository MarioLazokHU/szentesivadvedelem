<script lang="ts">
  type AdminBlogPost = {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  let { data } = $props<{ data: { posts: AdminBlogPost[] } }>();
  let posts = $state<AdminBlogPost[]>([]);
  let newTitle = $state('');
  let newSubtitle = $state('');
  let newContent = $state('');
  let creating = $state(false);
  let savingId = $state<string | null>(null);
  let deletingId = $state<string | null>(null);
  let successMessage = $state('');
  let errorMessage = $state('');

  $effect(() => {
    posts = [...data.posts].sort((a, b) => getTime(b.createdAt) - getTime(a.createdAt));
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

  async function createPost(event: SubmitEvent) {
    event.preventDefault();
    clearMessages();
    creating = true;

    try {
      if (!newTitle.trim() || !newContent.trim()) {
        throw new Error('A cím és a tartalom megadása kötelező.');
      }

      const response = await fetch('/admin/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, subtitle: newSubtitle, content: newContent })
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      newTitle = '';
      newSubtitle = '';
      newContent = '';
      successMessage = 'A bejegyzés sikeresen létrehozva.';
      window.location.reload();
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Nem sikerült létrehozni a bejegyzést.';
    } finally {
      creating = false;
    }
  }

  async function updatePost(post: AdminBlogPost) {
    clearMessages();
    savingId = post.id;

    try {
      const response = await fetch('/admin/api/blogs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: post.id, title: post.title, subtitle: post.subtitle, content: post.content })
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      successMessage = 'A bejegyzés sikeresen frissítve.';
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Nem sikerült frissíteni a bejegyzést.';
    } finally {
      savingId = null;
    }
  }

  async function deletePost(post: AdminBlogPost) {
    if (!confirm('Biztosan törlöd ezt a bejegyzést?')) return;

    clearMessages();
    deletingId = post.id;

    try {
      const response = await fetch('/admin/api/blogs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: post.id })
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      posts = posts.filter((item) => item.id !== post.id);
      successMessage = 'A bejegyzés törölve.';
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : 'Nem sikerült törölni a bejegyzést.';
    } finally {
      deletingId = null;
    }
  }
</script>

<svelte:head>
  <title>Admin | Blogok</title>
</svelte:head>

<main class="min-h-screen overflow-x-hidden bg-zinc-950 px-3 py-8 text-zinc-100 sm:px-6 lg:px-8">
  <section class="w-full space-y-8 overflow-x-hidden">
    <div class="flex flex-col justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl shadow-black/20 sm:p-8 lg:flex-row lg:items-end">
      <div>
        <p class="text-sm font-black uppercase tracking-[0.3em] text-green-400">Admin</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Blogbejegyzések kezelése</h1>
        <p class="mt-4 max-w-2xl text-zinc-400">Új bejegyzéseket hozhatsz létre, meglévőket szerkeszthetsz és törölhetsz.</p>
      </div>
      <div class="rounded-xl bg-[#69a61e] px-5 py-4 text-center text-white">
        <p class="text-3xl font-black">{posts.length}</p>
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-green-100">bejegyzés</p>
      </div>
    </div>

    {#if successMessage}
      <div class="rounded-xl bg-green-950 p-4 font-bold text-green-200 ring-1 ring-green-700">{successMessage}</div>
    {/if}

    {#if errorMessage}
      <div class="rounded-xl bg-red-950 p-4 font-bold text-red-200 ring-1 ring-red-800">{errorMessage}</div>
    {/if}

    <form onsubmit={createPost} class="grid min-w-0 max-w-full gap-5 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl shadow-black/20 sm:p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
      <div class="grid gap-4">
        <label class="grid gap-2">
          <span class="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Cím</span>
          <input bind:value={newTitle} type="text" class="block w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 font-semibold text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-green-500" placeholder="Bejegyzés címe" required />
        </label>

        <label class="grid gap-2">
          <span class="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Alcím</span>
          <input bind:value={newSubtitle} type="text" class="block w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 font-semibold text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-green-500" placeholder="Rövid alcím" />
        </label>

        <label class="grid gap-2">
          <span class="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Tartalom</span>
          <textarea bind:value={newContent} rows="6" class="block w-full resize-none rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm font-semibold leading-6 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-green-500" placeholder="A bejegyzés szövege" required></textarea>
        </label>
      </div>

      <button type="submit" class="w-full min-w-0 rounded-lg bg-[#69a61e] px-6 py-4 font-black text-white shadow-lg shadow-[#69a61e]/25 transition hover:-translate-y-0.5 hover:bg-[#558819] disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto" disabled={creating}>
        {creating ? 'Létrehozás...' : 'Új bejegyzés létrehozása'}
      </button>
    </form>

    <div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl shadow-black/20">
      <p class="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">Már meglévő blogbejegyzések</p>
    </div>

    {#if posts.length === 0}
      <div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center shadow-xl shadow-black/20">
        <p class="text-xl font-black">Még nincs blogbejegyzés.</p>
        <p class="mt-2 text-zinc-400">Az első bejegyzést a fenti űrlappal adhatod hozzá.</p>
      </div>
    {:else}
      <div class="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl shadow-black/20">
        <div class="hidden grid-cols-[1.2fr_1fr_220px] gap-4 border-b border-zinc-800 bg-zinc-950 px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-zinc-400 lg:grid">
          <span>Bejegyzés</span>
          <span>Meta</span>
          <span>Műveletek</span>
        </div>

        <div class="divide-y divide-zinc-800">
          {#each posts as post (post.id)}
            <article class="grid min-w-0 gap-4 p-4 sm:p-6 lg:grid-cols-[1.2fr_1fr_220px] lg:items-center">
              <div class="grid gap-4">
                <label class="grid gap-2">
                  <span class="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 lg:hidden">Cím</span>
                  <input bind:value={post.title} type="text" class="block w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 font-semibold text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-green-500" />
                </label>

                <label class="grid gap-2">
                  <span class="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 lg:hidden">Alcím</span>
                  <input bind:value={post.subtitle} type="text" class="block w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 font-semibold text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-green-500" />
                </label>

                <label class="grid gap-2">
                  <span class="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 lg:hidden">Tartalom</span>
                  <textarea bind:value={post.content} rows="5" class="block w-full resize-none rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm font-semibold leading-6 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-green-500"></textarea>
                </label>
              </div>

              <div class="min-w-0 space-y-2">
                <p class="text-sm font-semibold text-zinc-300">Létrehozva: {formatDate(post.createdAt)}</p>
                <p class="text-sm font-semibold text-zinc-500">Frissítve: {formatDate(post.updatedAt)}</p>
              </div>

              <div class="grid min-w-0 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <button type="button" class="rounded-lg bg-[#69a61e] px-4 py-3 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#558819] disabled:cursor-not-allowed disabled:opacity-60" disabled={savingId === post.id || deletingId === post.id} onclick={() => updatePost(post)}>
                  {savingId === post.id ? 'Mentés...' : 'Mentés'}
                </button>
                <button type="button" class="rounded-lg bg-red-950 px-4 py-3 font-black text-red-200 ring-1 ring-red-800 transition hover:-translate-y-0.5 hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-60" disabled={savingId === post.id || deletingId === post.id} onclick={() => deletePost(post)}>
                  {deletingId === post.id ? 'Törlés...' : 'Törlés'}
                </button>
              </div>
            </article>
          {/each}
        </div>
      </div>
    {/if}
  </section>
</main>
