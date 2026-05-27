<script lang="ts">
  type AdminImage = {
    id: string;
    fileName?: string | null;
    description?: string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
  };

  let { data } = $props<{ data: { images: AdminImage[] } }>();
  let images = $state<AdminImage[]>([]);
  let uploadForm: HTMLFormElement;
  let uploadPending = $state(false);
  let savingId = $state<string | null>(null);
  let deletingId = $state<string | null>(null);
  let successMessage = $state("");
  let errorMessage = $state("");
  let selectedFiles = $state<File[]>([]);
  let isDragging = $state(false);

  $effect(() => {
    images = [...data.images].sort(
      (a, b) => getTime(b.createdAt) - getTime(a.createdAt),
    );
  });

  function getTime(value?: Date | string | null) {
    return value ? new Date(value).getTime() : 0;
  }

  function formatDate(value?: Date | string | null) {
    if (!value) return "Nincs dátum";
    return new Intl.DateTimeFormat("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  }

  function clearMessages() {
    successMessage = "";
    errorMessage = "";
  }

  const imagePreviewFallback =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240"><rect width="100%" height="100%" fill="#111827"/><text x="50%" y="50%" fill="#9ca3af" font-family="Arial,Helvetica,sans-serif" font-size="20" text-anchor="middle" dominant-baseline="middle">Nincs előnézet</text></svg>',
    );

  function handleImageError(event: Event) {
    const img = event.currentTarget as HTMLImageElement;
    img.src = imagePreviewFallback;
  }

  function addSelectedFiles(fileList: FileList | File[]) {
    const imageFiles = Array.from(fileList).filter((file) => file.type.startsWith("image/"));
    selectedFiles = [...selectedFiles, ...imageFiles];
  }

  function updateSelectedFile(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    addSelectedFiles(input.files ?? []);
  }

  function dropFiles(event: DragEvent) {
    event.preventDefault();
    isDragging = false;
    addSelectedFiles(event.dataTransfer?.files ?? []);
  }

  function clearSelectedFiles() {
    selectedFiles = [];
    uploadForm?.reset();
  }

  async function uploadImage(event: SubmitEvent) {
    event.preventDefault();
    clearMessages();
    uploadPending = true;

    try {
      const currentFormData = new FormData(uploadForm);

      if (selectedFiles.length === 0) {
        throw new Error("Válassz ki legalább egy képet a feltöltéshez.");
      }

      const formData = new FormData();
      formData.set("description", (currentFormData.get("description") as string) || "");
      selectedFiles.forEach((file) => formData.append("files", file));

      const response = await fetch("/admin/api/images", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      successMessage = `${selectedFiles.length} kép sikeresen feltöltve.`;
      uploadForm.reset();
      selectedFiles = [];
      setTimeout(() => location.reload(), 400);
    } catch (error) {
      errorMessage =
        error instanceof Error
          ? error.message
          : "Nem sikerült feltölteni a képet.";
    } finally {
      uploadPending = false;
    }
  }

  async function updateDescription(image: AdminImage) {
    clearMessages();
    savingId = image.id;

    try {
      const response = await fetch("/admin/api/images", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: image.id,
          description: image.description ?? "",
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      successMessage = "A leírás frissítve.";
    } catch (error) {
      errorMessage =
        error instanceof Error
          ? error.message
          : "Nem sikerült frissíteni a leírást.";
    } finally {
      savingId = null;
    }
  }

  async function deleteImage(image: AdminImage) {
    if (!confirm("Biztosan törlöd ezt a képet?")) return;

    clearMessages();
    deletingId = image.id;

    try {
      const response = await fetch("/admin/api/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: image.id }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      successMessage = "A kép törölve.";
      images = images.filter((item) => item.id !== image.id);
    } catch (error) {
      errorMessage =
        error instanceof Error
          ? error.message
          : "Nem sikerült törölni a képet.";
    } finally {
      deletingId = null;
    }
  }
</script>

<svelte:head>
  <title>Admin | Képek</title>
</svelte:head>

<main
  class="min-h-screen overflow-x-hidden bg-zinc-950 px-3 py-8 text-zinc-100 sm:px-6 lg:px-8"
>
  <section class="w-full space-y-8 overflow-x-hidden">
    <div
      class="flex flex-col justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl shadow-black/20 sm:p-8 lg:flex-row lg:items-end"
    >
      <div>
        <p class="text-sm font-black uppercase tracking-[0.3em] text-green-400">
          Admin
        </p>
        <h1 class="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
          Képek kezelése
        </h1>
        <p class="mt-4 max-w-2xl text-zinc-400">
          Képek feltöltése, listázása, leírás frissítése és törlése.
        </p>
      </div>
      <div class="rounded-xl bg-[#69a61e] px-5 py-4 text-center text-white">
        <p class="text-3xl font-black">{images.length}</p>
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-green-100">
          kép
        </p>
      </div>
    </div>

    {#if successMessage}
      <div
        class="rounded-xl bg-green-950 p-4 font-bold text-green-200 ring-1 ring-green-700"
      >
        {successMessage}
      </div>
    {/if}

    {#if errorMessage}
      <div
        class="rounded-xl bg-red-950 p-4 font-bold text-red-200 ring-1 ring-red-800"
      >
        {errorMessage}
      </div>
    {/if}

    <form
      bind:this={uploadForm}
      onsubmit={uploadImage}
      class="grid min-w-0 max-w-full gap-5 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl shadow-black/20 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_auto] lg:items-end"
    >
      <label class="grid min-w-0 max-w-full gap-2 overflow-hidden">
        <span
          class="text-sm font-black uppercase tracking-[0.2em] text-zinc-400"
          >Kép</span
        >
        <span
          class={`grid min-w-0 max-w-full gap-2 rounded-lg border border-dashed p-4 transition ${isDragging ? "border-[#69a61e] bg-[#69a61e]/10" : "border-zinc-700 bg-zinc-950"}`}
          ondragover={(event) => {
            event.preventDefault();
            isDragging = true;
          }}
          ondragleave={() => (isDragging = false)}
          ondrop={dropFiles}
        >
          <span
            class="w-fit rounded-md bg-[#69a61e] px-4 py-2 text-sm font-bold text-white"
            >Képek kiválasztása</span
          >
          {#if selectedFiles.length === 0}
            <span class="block max-w-full text-sm font-semibold text-zinc-400">Húzd ide a képeket vagy kattints a kiválasztáshoz.</span>
          {:else}
            <span class="block max-w-full text-sm font-semibold text-zinc-200">{selectedFiles.length} kép kiválasztva</span>
            <div class="grid gap-1 text-xs text-zinc-500">
              {#each selectedFiles.slice(0, 5) as file}
                <span class="truncate">{file.name}</span>
              {/each}
              {#if selectedFiles.length > 5}
                <span>+ {selectedFiles.length - 5} további kép</span>
              {/if}
            </div>
            <button
              type="button"
              class="w-fit rounded-md bg-zinc-800 px-3 py-2 text-xs font-bold text-zinc-200 transition hover:bg-zinc-700"
              onclick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                clearSelectedFiles();
              }}
            >Kijelölés törlése</button>
          {/if}
          <span class="text-xs text-zinc-500"
            >A képek automatikusan WebP formátumba lesznek konvertálva.</span
          >
          <input
            name="files"
            type="file"
            accept="image/*"
            multiple
            class="sr-only"
            onchange={updateSelectedFile}
          />
        </span>
      </label>

      <label class="grid min-w-0 max-w-full gap-2 overflow-hidden">
        <span
          class="text-sm font-black uppercase tracking-[0.2em] text-zinc-400"
          >Leírás</span
        >
        <input
          name="description"
          type="text"
          class="block w-full min-w-0 max-w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 font-semibold text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-green-500"
          placeholder="Rövid képleírás"
        />
      </label>

      <button
        type="submit"
        class="w-full min-w-0 rounded-lg bg-[#69a61e] px-6 py-4 font-black text-white shadow-lg shadow-[#69a61e]/25 transition hover:-translate-y-0.5 hover:bg-[#558819] disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto"
        disabled={uploadPending}
      >
        {uploadPending ? "Feltöltés..." : "Feltöltés"}
      </button>
    </form>

    <div
      class="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl shadow-black/20"
    >
      <p class="text-sm font-black uppercase tracking-[0.2em] text-zinc-400">
        Már feltöltött képek
      </p>
    </div>

    {#if images.length === 0}
      <div
        class="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center shadow-xl shadow-black/20"
      >
        <p class="text-xl font-black">Még nincs feltöltött kép.</p>
        <p class="mt-2 text-zinc-400">
          Az első képet a fenti feltöltővel adhatod hozzá.
        </p>
      </div>
    {:else}
      <div
        class="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl shadow-black/20"
      >
        <div
          class="hidden grid-cols-[120px_1fr_1.4fr_220px] gap-4 border-b border-zinc-800 bg-zinc-950 px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-zinc-400 lg:grid"
        >
          <span>Kép</span>
          <span>Adatok</span>
          <span>Description</span>
          <span>Műveletek</span>
        </div>

        <div class="divide-y divide-zinc-800">
          {#each images as image (image.id)}
            <article
              class="grid min-w-0 gap-4 p-4 sm:p-6 lg:grid-cols-[120px_1fr_1.4fr_220px] lg:items-center"
            >
              <a
                href="/api/images/{image.id}"
                target="_blank"
                rel="noreferrer"
                class="block min-w-0 overflow-hidden rounded-lg bg-zinc-800 ring-1 ring-zinc-700"
              >
                <img
                  src="/api/images/{image.id}"
                  alt={image.description || "Admin képelőnézet"}
                  class="h-28 w-full object-cover lg:h-24"
                  loading="lazy"
                  onerror={handleImageError}
                />
              </a>

              <div class="min-w-0 space-y-2">
                <p class="text-sm font-semibold text-zinc-300">
                  Létrehozva: {formatDate(image.createdAt)}
                </p>
                <p class="text-sm font-semibold text-zinc-500">
                  Frissítve: {formatDate(image.updatedAt)}
                </p>
              </div>
              <label class="grid min-w-0 max-w-full gap-2 overflow-hidden">
                <span
                  class="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 lg:hidden"
                  >Description</span
                >
                <textarea
                  bind:value={image.description}
                  rows="3"
                  class="block w-full min-w-0 max-w-full resize-none rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm font-semibold leading-6 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-green-500"
                  placeholder="Kép leírása"
                ></textarea>
              </label>

              <div class="grid min-w-0 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <a
                  href="/api/images/{image.id}"
                  target="_blank"
                  rel="noreferrer"
                  class="rounded-lg bg-zinc-800 px-4 py-3 text-center font-black text-zinc-100 transition hover:bg-zinc-700"
                  >Megnyitás</a
                >
                <button
                  type="button"
                  class="rounded-lg bg-[#69a61e] px-4 py-3 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#558819] disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={savingId === image.id || deletingId === image.id}
                  onclick={() => updateDescription(image)}
                >
                  {savingId === image.id ? "Mentés..." : "Mentés"}
                </button>
                <button
                  type="button"
                  class="rounded-lg bg-red-950 px-4 py-3 font-black text-red-200 ring-1 ring-red-800 transition hover:-translate-y-0.5 hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={savingId === image.id || deletingId === image.id}
                  onclick={() => deleteImage(image)}
                >
                  {deletingId === image.id ? "Törlés..." : "Törlés"}
                </button>
              </div>
            </article>
          {/each}
        </div>
      </div>
    {/if}
  </section>
</main>
