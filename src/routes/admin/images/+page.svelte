<script lang="ts">
	type AdminImage = {
		id: string;
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
	let successMessage = $state('');
	let errorMessage = $state('');
	let selectedFileName = $state('Nincs fájl kiválasztva');

	$effect(() => {
		images = [...data.images].sort((a, b) => getTime(b.createdAt) - getTime(a.createdAt));
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

	function updateSelectedFile(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		selectedFileName = input.files?.[0]?.name ?? 'Nincs fájl kiválasztva';
	}

	async function uploadImage(event: SubmitEvent) {
		event.preventDefault();
		clearMessages();
		uploadPending = true;

		try {
			const formData = new FormData(uploadForm);
			const file = formData.get('file');

			if (!(file instanceof File) || file.size === 0) {
				throw new Error('Válassz ki egy képet a feltöltéshez.');
			}

			const response = await fetch('/admin/api/images', {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error(await response.text());
			}

			successMessage = 'A kép sikeresen feltöltve.';
			uploadForm.reset();
			selectedFileName = 'Nincs fájl kiválasztva';
			setTimeout(() => location.reload(), 400);
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'Nem sikerült feltölteni a képet.';
		} finally {
			uploadPending = false;
		}
	}

	async function updateDescription(image: AdminImage) {
		clearMessages();
		savingId = image.id;

		try {
			const response = await fetch('/admin/api/images', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: image.id, description: image.description ?? '' })
			});

			if (!response.ok) {
				throw new Error(await response.text());
			}

			successMessage = 'A leírás frissítve.';
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'Nem sikerült frissíteni a leírást.';
		} finally {
			savingId = null;
		}
	}

	async function deleteImage(image: AdminImage) {
		if (!confirm('Biztosan törlöd ezt a képet?')) return;

		clearMessages();
		deletingId = image.id;

		try {
			const response = await fetch('/admin/api/images', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: image.id })
			});

			if (!response.ok) {
				throw new Error(await response.text());
			}

			successMessage = 'A kép törölve.';
			images = images.filter((item) => item.id !== image.id);
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'Nem sikerült törölni a képet.';
		} finally {
			deletingId = null;
		}
	}
</script>

<svelte:head>
	<title>Admin | Képek</title>
</svelte:head>


<main class="min-h-screen overflow-x-hidden bg-stone-100 px-3 py-8 text-stone-900 sm:px-6 lg:px-8">
	<section class="mx-auto max-w-7xl space-y-8 overflow-x-hidden">
		<div class="flex flex-col justify-between gap-4 rounded-4xl bg-white p-6 shadow-xl shadow-stone-900/10 sm:p-8 lg:flex-row lg:items-end">
			<div>
				<p class="text-sm font-black uppercase tracking-[0.3em] text-stone-500">Admin</p>
				<h1 class="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Képek kezelése</h1>
				<p class="mt-4 max-w-2xl text-stone-600">Képek feltöltése, listázása, leírás frissítése és törlése.</p>
			</div>
			<div class="rounded-3xl bg-stone-900 px-5 py-4 text-center text-white">
				<p class="text-3xl font-black">{images.length}</p>
				<p class="text-xs font-bold uppercase tracking-[0.2em] text-stone-300">kép</p>
			</div>
		</div>

		{#if successMessage}
			<div class="rounded-3xl bg-emerald-50 p-4 font-bold text-emerald-800 ring-1 ring-emerald-200">{successMessage}</div>
		{/if}

		{#if errorMessage}
			<div class="rounded-3xl bg-red-50 p-4 font-bold text-red-800 ring-1 ring-red-200">{errorMessage}</div>
		{/if}

		<form bind:this={uploadForm} onsubmit={uploadImage} class="grid min-w-0 max-w-full gap-5 overflow-hidden rounded-4xl bg-white p-4 shadow-xl shadow-stone-900/10 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_auto] lg:items-end">
			<label class="grid min-w-0 max-w-full gap-2 overflow-hidden">
				<span class="text-sm font-black uppercase tracking-[0.2em] text-stone-500">Kép</span>
				<span class="grid min-w-0 max-w-full gap-2 rounded-2xl border border-stone-200 bg-stone-50 p-3">
					<span class="w-fit rounded-xl bg-stone-900 px-4 py-2 text-sm font-bold text-white">Fájl kiválasztása</span>
					<span class="block max-w-full truncate text-sm font-semibold text-stone-600">{selectedFileName}</span>
					<input name="file" type="file" accept="image/*" class="sr-only" required onchange={updateSelectedFile} />
				</span>
			</label>

			<label class="grid min-w-0 max-w-full gap-2 overflow-hidden">
				<span class="text-sm font-black uppercase tracking-[0.2em] text-stone-500">Leírás</span>
				<input name="description" type="text" class="block w-full min-w-0 max-w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 font-semibold outline-none transition focus:border-stone-500 focus:bg-white" placeholder="Rövid képleírás" />
			</label>

			<button type="submit" class="w-full min-w-0 rounded-2xl bg-stone-900 px-6 py-4 font-black text-white shadow-lg shadow-stone-900/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto" disabled={uploadPending}>
				{uploadPending ? 'Feltöltés...' : 'Feltöltés'}
			</button>
		</form>

		{#if images.length === 0}
			<div class="rounded-4xl bg-white p-10 text-center shadow-xl shadow-stone-900/10">
				<p class="text-xl font-black">Még nincs feltöltött kép.</p>
				<p class="mt-2 text-stone-600">Az első képet a fenti feltöltővel adhatod hozzá.</p>
			</div>
		{:else}
			<div class="overflow-hidden rounded-4xl bg-white shadow-xl shadow-stone-900/10">
				<div class="hidden grid-cols-[120px_1fr_1.4fr_220px] gap-4 border-b border-stone-200 bg-stone-50 px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-stone-500 lg:grid">
					<span>Kép</span>
					<span>Adatok</span>
					<span>Description</span>
					<span>Műveletek</span>
				</div>

				<div class="divide-y divide-stone-200">
					{#each images as image (image.id)}
						<article class="grid min-w-0 gap-4 p-4 sm:p-6 lg:grid-cols-[120px_1fr_1.4fr_220px] lg:items-center">
							<a href={`/api/images/${image.id}`} target="_blank" rel="noreferrer" class="block min-w-0 overflow-hidden rounded-2xl bg-stone-200 ring-1 ring-stone-200">
								<img src={`/api/images/${image.id}`} alt={image.description || 'Admin képelőnézet'} class="h-28 w-full object-cover lg:h-24" loading="lazy" />
							</a>

							<div class="min-w-0 space-y-2">
								<p class="truncate text-xs font-black uppercase tracking-[0.18em] text-stone-500">{image.id}</p>
								<p class="text-sm font-semibold text-stone-600">Létrehozva: {formatDate(image.createdAt)}</p>
								<p class="text-sm font-semibold text-stone-500">Frissítve: {formatDate(image.updatedAt)}</p>
							</div>

							<label class="grid min-w-0 max-w-full gap-2 overflow-hidden">
								<span class="text-xs font-black uppercase tracking-[0.2em] text-stone-500 lg:hidden">Description</span>
								<textarea bind:value={image.description} rows="3" class="block w-full min-w-0 max-w-full resize-none rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-semibold leading-6 outline-none transition focus:border-stone-500 focus:bg-white" placeholder="Kép leírása"></textarea>
							</label>

							<div class="grid min-w-0 gap-3 sm:grid-cols-3 lg:grid-cols-1">
								<a href={`/api/images/${image.id}`} target="_blank" rel="noreferrer" class="rounded-2xl bg-stone-100 px-4 py-3 text-center font-black text-stone-700 transition hover:bg-stone-200">Megnyitás</a>
								<button type="button" class="rounded-2xl bg-stone-900 px-4 py-3 font-black text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60" disabled={savingId === image.id || deletingId === image.id} onclick={() => updateDescription(image)}>
									{savingId === image.id ? 'Mentés...' : 'Mentés'}
								</button>
								<button type="button" class="rounded-2xl bg-red-50 px-4 py-3 font-black text-red-800 ring-1 ring-red-200 transition hover:-translate-y-0.5 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60" disabled={savingId === image.id || deletingId === image.id} onclick={() => deleteImage(image)}>
									{deletingId === image.id ? 'Törlés...' : 'Törlés'}
								</button>
							</div>
						</article>
					{/each}
				</div>
			</div>
		{/if}
	</section>
</main>