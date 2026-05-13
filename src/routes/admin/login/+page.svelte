<script lang="ts">
  let password = '';
  let error = '';
  let submitting = false;

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    error = '';
    submitting = true;

    try {
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        const message = await response.text();
        error = message || 'Hiba történt a bejelentkezés során.';
        return;
      }

      window.location.href = '/admin';
    } catch (err) {
      error = err instanceof Error ? err.message : 'Hiba történt a bejelentkezés során.';
    } finally {
      submitting = false;
    }
  }
</script>

<svelte:head>
  <title>Admin bejelentkezés</title>
</svelte:head>

<main class="min-h-screen bg-zinc-950 px-4 py-16 text-zinc-100 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10 shadow-xl shadow-black/20">
    <p class="text-sm font-black uppercase tracking-[0.3em] text-green-400">Admin</p>
    <h1 class="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Bejelentkezés</h1>
    <p class="mt-4 text-zinc-400">Add meg a jelszót az admin felület eléréséhez.</p>

    {#if error}
      <div class="mt-6 rounded-2xl bg-red-950 p-4 text-sm font-semibold text-red-200 ring-1 ring-red-800">{error}</div>
    {/if}

    <form on:submit={handleSubmit} class="mt-8 grid gap-5">
      <label class="grid gap-2 text-sm font-semibold text-zinc-200">
        Jelszó
        <input
          type="password"
          bind:value={password}
          class="block w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-zinc-100 outline-none transition focus:border-green-500"
          placeholder="Admin jelszó"
          required
        />
      </label>

      <button
        type="submit"
        class="rounded-2xl bg-[#69a61e] px-5 py-3 text-sm font-black uppercase tracking-[0.15em] text-white transition hover:bg-[#558819] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={submitting}
      >
        {submitting ? 'Bejelentkezés...' : 'Bejelentkezés'}
      </button>
    </form>

    <p class="mt-6 text-xs text-zinc-500">A bejelentkezés csak adminisztrátorok számára elérhető.</p>
  </div>
</main>
