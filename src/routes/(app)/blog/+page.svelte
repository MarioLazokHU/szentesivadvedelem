<script lang="ts">
  import { foundation } from '$lib/site.js';

  export let data: {
    blog: {
      id: string;
      title: string;
      content: string;
      createdAt: string;
      updatedAt?: string | null;
    }[];
  };

  const posts = [...(data.blog ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  function formatDate(value?: string | Date | null) {
    if (!value) return 'Nincs dátum';
    return new Intl.DateTimeFormat('hu-HU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(value));
  }

  function excerpt(text: string, length = 240) {
    if (!text) return '';
    return text.length <= length ? text : text.slice(0, length).replace(/\s+\S*$/, '') + '...';
  }
</script>

<svelte:head>
  <title>{foundation.shortName} | Blog</title>
</svelte:head>

<section class="flex w-full items-center px-4 py-20 sm:px-8 lg:min-h-[70vh] lg:px-12 2xl:px-16">
  <div class="glass-card w-full overflow-hidden rounded-2xl bg-zinc-50/50 shadow-2xl">
    <div class="earth-gradient p-8 text-white sm:p-12">
      <p class="font-black uppercase tracking-[0.3em] text-white/70">Blog</p>
      <h1 class="mt-4 text-5xl font-black tracking-tight sm:text-7xl">Legfrissebb bejegyzések</h1>
      <p class="mt-4 max-w-3xl text-lg text-zinc-100/80">Olvasd el legújabb híreinket, történeteinket és a természetvédelemről szóló írásainkat.</p>
    </div>

    <div class="p-8 sm:p-12">
      {#if posts.length > 0}
        <div class="grid grid-cols-1 gap-8">
          {#each posts as post}
            <article class="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div class="p-8">
                <h2 class="text-2xl font-black tracking-tight text-zinc-900">{post.title}</h2>
                <p class="mt-4 text-sm leading-7 text-zinc-600">{excerpt(post.content)}</p>
                <div class="mt-6 flex flex-col gap-2 border-t border-zinc-100 pt-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                  <span>{formatDate(post.createdAt)}</span>
                  {#if post.updatedAt && post.updatedAt !== post.createdAt}
                    <span>Frissítve: {formatDate(post.updatedAt)}</span>
                  {/if}
                </div>
              </div>
            </article>
          {/each}
        </div>
      {:else}
        <div class="rounded-2xl border-2 border-dashed border-zinc-200 p-20 text-center">
          <p class="text-xl font-medium text-zinc-600">Még nincs hozzáadott blogbejegyzés.</p>
          <p class="mt-3 text-sm text-zinc-500">Kérlek, adj hozzá egyet az admin felületen.</p>
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
</style>
